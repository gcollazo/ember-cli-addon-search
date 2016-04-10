const addonsUrl = 'https://io-builtwithember-addons-data.s3.amazonaws.com/addons.json';
const GRAVATAR_CACHE = 'GRAVATAR_URLS';

toolbox.router.get('/addons.json', toolbox.networkFirst, {origin: 'https://io-builtwithember-addons-data.s3.amazonaws.com'});
toolbox.precache(addonsUrl);

// Request the addons.js, filter the gravatar ulrs and return an array of gravatar urls.
function gravatarUrls() {
  return fetch(addonsUrl).then(function(response) {
    return response.json();
  }).then(function(json) {
    return json.map(function(curr) {
      return curr['_npmUser'].gravatar ? curr['_npmUser'].gravatar + '?s=30&d=retro':'';
    }).filter(function(data, index, array) {
      if (array.indexOf(data) === index) {
        return data;
      }
    });
  });
}

// Go through every gravatar url and remove the origin.
function isGravatarUrl(url) {
  return url.indexOf('https://secure.gravatar.com');
}

// waitUntil expects a promise and it will stop the worker execution
// until the promise is resolved.
self.addEventListener('install', function(event) {
  event.waitUntil(
    gravatarUrls().then(function(urls) {
      // Open the specified cache if it exists. If the cache doesn't exist
      // create it and add prefetch the urls on the array.
      caches.open(GRAVATAR_CACHE).then(function(cache) {
        cache.addAll(urls);
      });
    })
  );
});

/**
  Intercept every request that the app makes. If it the request matches
  a request that has been stored in the cache return the response that is stored.

  If the request is not in the caches and if it's a new gravatar then fetch the new
  gravatar and add it to the gravatars cache. After storing the response in the cache
  we return a clone of the response to the app.
*/
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(res) {
        if (res) {
          return res;
        } else if (isGravatarUrl(event.request.url) >= 0) {
          return fetch(event.request.url).then(function(response) {
            caches.open(GRAVATAR_CACHE).then(function(cache) {
              cache.put(event.request, response);
            });

            return response.clone();
          });
        }
      })
  );
});
