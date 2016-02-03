var addonsLink = 'https://io-builtwithember-addons-data.s3.amazonaws.com/addons.json';

var CACHE_DEPENDENCIES_NAME = 'ADDONS_DEPENDENCIES';
var CACHE_DEPENDENCIES = [
  './',
  'sw.js',
  'assets/vendor.css',
  'assets/vendor.js',
  'assets/ember-addons-website.css',
  'assets/ember-addons-website.js',
  'assets/favicon.png',
  'fonts/fontawesome-webfont.woff?v=4.4.0',
  'fonts/fontawesome-webfont.woff2?v=4.4.0',
  'assets/github-logo.svg'
];
CACHE_DEPENDENCIES.push(addonsLink);

function urlsToPrefetch(cache) {
  return fetch(addonsLink).then(function(response) {
    return response.json();
  }).then(function(json) {
    return json.map(function(curr) {
      return curr["_npmUser"].gravatar + '?s=30&d=retro';
    }).filter(function(data, index, array) {
      if (array.indexOf(data) === index) {
        return data;
      }
    }).concat(CACHE_DEPENDENCIES);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    urlsToPrefetch().then(function(urls) {
      caches.open(CACHE_DEPENDENCIES_NAME).then(function(cache) {
        cache.addAll(urls);
      });
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(res) {
      if (res) {
        return res;
      }
    })
  );
});
