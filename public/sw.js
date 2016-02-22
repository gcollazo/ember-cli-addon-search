var addonsLink = 'https://io-builtwithember-addons-data.s3.amazonaws.com/addons.json';

var CACHE_DEPENDENCIES_NAME = 'ADDONS_DEPENDENCIES';
var CACHE_DEPENDENCIES = [
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

// Request the addons.js, filter the gravatar ulrs and
// add the new urls to the CACHE_DEPENDENCIES array.
function urlsToPrefetch() {
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

// waitUntil expects a promise and it will stop the worker execution
// until the promise is resolved.
self.addEventListener('install', function(event) {
  event.waitUntil(
    urlsToPrefetch().then(function(urls) {
      // Open the specified cache if it exists. If the cache doesn't exist
      // create it and add prefetch the urls on the array.
      caches.open(CACHE_DEPENDENCIES_NAME).then(function(cache) {
        cache.addAll(urls);
      });
    })
  );
});

// Intercept every request that the app makes. If it the request matches
// a request that has been stored in the cache return the response that is stored.
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(res) {
      if (res) {
        return res;
      }
    })
  );
});
