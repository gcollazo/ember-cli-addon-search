/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var parseFlag = require('./config/parse-flag');
var env = EmberApp.env();

var AIRPLANE_MODE    = parseFlag('AIRPLANE_MODE', false);
var GOOGLE_ANALYTICS = !AIRPLANE_MODE && parseFlag('GOOGLE_ANALYTICS', env === 'production');

module.exports = function(defaults) {
  var options = {
    inlineContent: {},
    minifyJS: {},
    minifyCSS: {},
    sourcemaps: {
      extensions: ['js']
    },
    fingerprint: {
      exclude: ['gravatar.jpg']
    }
  };

  options.inlineContent['snippets/perf-utils'] = 'app/snippets/perf-utils.js';

  if (GOOGLE_ANALYTICS) {
    options.inlineContent['snippets/google-analytics'] = 'app/snippets/google-analytics.js';
  }

  options.minifyJS.enabled = parseFlag('MINIFY_JS', env === 'production');

  options.minifyCSS.enabled = parseFlag('MINIFY_CSS', env === 'production');

  options.sourcemaps.enabled = parseFlag('SOURCEMAPS', env !== 'production');

  var app = new EmberApp(defaults, options);

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.
  app.import('bower_components/bootstrap/dist/css/bootstrap.min.css');
  app.import('bower_components/bootstrap/dist/js/bootstrap.min.js');

  if (AIRPLANE_MODE) {
    app.import('vendor/airplane-mode/addons.json', { destDir: 'assets' });
    app.import('vendor/airplane-mode/gravatar.jpg', { destDir: 'assets' });
  }

  return app.toTree();
};
