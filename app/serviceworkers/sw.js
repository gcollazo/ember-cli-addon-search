const addonsLink = 'https://io-builtwithember-addons-data.s3.amazonaws.com/addons.json';
const GRAVATAR_CACHE = 'GRAVATAR_URLS';

toolbox.router.get('/addons/json', toolbox.networkFirst, {origin: 'https://io-builtwithember-addons-data.s3.amazonaws.com'});
toolbox.precache(addonsLink);


// Request the addons.js, filter the gravatar ulrs and return an array of gravatar urls.
function gravatarUrls() {
  return fetch(addonsLink).then(function(response) {
    return response.json();
  }).then(function(json) {
    return json.map(function(curr) {
      return curr['_npmUser'].gravatar + '?s=30&d=retro';
    }).filter(function(data, index, array) {
      if (array.indexOf(data) === index) {
        return data;
      }
    });
  });
}

// Go through every gravatar url and remove the origin.
function addGravatarUrlsToRouter(urls) {
  const gravatarUrl = 'https://secure.gravatar.com';
  const regex = /https:\/\/secure.gravatar.com/g;

  urls.forEach(function(url) {
    const gravatarPath = url.replace(regex, '');

    toolbox.router.get(gravatarPath, toolbox.cacheFirst, {origin: gravatarUrl});
  });
}

// waitUntil expects a promise and it will stop the worker execution
// until the promise is resolved.
self.addEventListener('install', function(event) {
  event.waitUntil(
    gravatarUrls().then(function(urls) {
      addGravatarUrlsToRouter(urls);

      // Open the specified cache if it exists. If the cache doesn't exist
      // create it and add prefetch the urls on the array.
      caches.open(GRAVATAR_CACHE).then(function(cache) {
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
