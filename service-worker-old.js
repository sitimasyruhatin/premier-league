const CACHE_NAME = 'firstpwa-v1';
let urlsToCache = [
  '/',
  '/index.html',
  '/detail-team.html',
  '/src/pages/nav.html',
  '/src/pages/footer.html',
  '/src/pages/home.html',
  '/src/pages/teams.html',
  '/src/pages/favorite.html',
  '/src/assets/css/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
  '/src/assets/css/Material_Icons.css',
  '/src/assets/css/materialize.min.css',
  '/src/assets/css/style.css',
  '/src/assets/js/api.js',
  'https://unpkg.com/axios/dist/axios.min.js',
  '/src/assets/js/db.js',
  '/src/assets/js/detail-team.js',
  '/src/assets/js/footer.js',
  '/src/assets/js/home.js',
  '/src/assets/js/idb.js',
  '/src/assets/js/materialize.min.js',
  '/src/assets/js/nav.js',
  '/src/assets/js/sw-register.js',
  '/manifest.json',
  '/src/assets/images/logo.png',
  '/src/assets/images/crew.png',
  '/src/assets/images/default-logo.svg',
  '/src/assets/images/heading.svg',
  '/src/assets/images/icon-512x512.png',
  '/src/assets/images/icon-192x192.png',
  '/src/assets/images/icon-filled-192x192.png',
  '/src/assets/images/maskable_icon.png',
  '/src/assets/images/icon.png',
  '/src/assets/images/warning.png',
  '/src/assets/images/404.png',
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function (event) {
  let base_url = 'https://api.football-data.org/v2/';
  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function (cache) {
        return fetch(event.request).then(function (response) {
          cache.put(event.request.url, response.clone());
          return response;
        });
      })
    );
  } else {
    event.respondWith(
      caches
        .match(event.request, { ignoreSearch: true })
        .then(function (response) {
          return response || fetch(event.request);
        })
    );
  }
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log('ServiceWorker: cache ' + cacheName + ' dihapus');
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('push', function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: '/src/assets/images/icon-192x192.png',
    badge: '/src/assets/images/icon-192x192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };
  event.waitUntil(self.registration.showNotification('Match Today', options));
});
