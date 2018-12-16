/***************************************************************
 * Cache name and project files to store in cache
 ***************************************************************/

const cacheName = 'doggyDayCare.v.1.0';
const cacheFiles = [
  '/',
  '/index.html',
  '/assets/css/main.css',
  '/assets/css/noscript.css',
  // '/bundle.js',
  '/images/pictures/dog-with-ball-medium.jpg',
  '/images/pictures/dog-with-ball-small.jpg',
  '/images/pictures/dog-with-ball.jpg',
  '/images/pictures/dogs-walking-on-leash-small.jpg',
  '/images/pictures/dogs-walking-on-leash.jpg',
  '/images/pictures/portrait-small.jpg',
  '/images/pictures/portrait.jpg',
  '/images/pictures/toby-gemma-small.jpg',
  '/images/bg.jpg',
  '/images/overlay.png',
  '/images/pic01.jpg',
  '/images/pic02.jpg',
  '/images/pic03.jpg'
];

/***************************************************************
 * Cache Important Files on ServiceWorker Install
 ***************************************************************/

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log(`Opened cache: ${cacheName}`);
      return cache.addAll(cacheFiles)
    })
  );
});

/***************************************************************
 * Use cached data when available, and cache new requests
 ***************************************************************/

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        console.log(`${event.request} was found in the cache.`);
        return response;
      } else {
        console.log(`Unable to find ${event.request} in catch. Fetching...`);
        return fetch(event.request)
          .then(response => {
            const responseClone = response.clone();
            caches.open(cacheName).then(cache => {
              cache.put(event.request, responseClone);
            })
            return response;
          })
          .catch(err => {
            console.error(err);
          })
      }
    })
  );
});