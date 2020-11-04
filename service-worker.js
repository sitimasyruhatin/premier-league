importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js'
);

if (workbox) {
  workbox.core.setCacheNameDetails({
    prefix: 'premiere-league',
  });
  console.log(`Workbox berhasil dimuat`);
} else {
  console.log(`Workbox gagal dimuat`);
}
workbox.precaching.precacheAndRoute(
  [
    { url: '/index.html', revision: '1' },
    { url: '/detail-team.html', revision: '1' },
    { url: '/src/pages/nav.html', revision: '1' },
    { url: '/src/pages/footer.html', revision: '1' },
    { url: '/src/pages/home.html', revision: '1' },
    { url: '/src/pages/teams.html', revision: '1' },
    { url: '/src/pages/favorite.html', revision: '1' },
    {
      url: '/src/assets/css/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
      revision: '1',
    },
    { url: '/src/assets/css/Material_Icons.css', revision: '1' },
    { url: '/src/assets/css/materialize.min.css', revision: '1' },
    { url: '/src/assets/css/style.css', revision: '1' },
    { url: '/src/assets/js/api.js', revision: '1' },
    { url: '/src/assets/js/axios.min.js', revision: '1' },
    { url: '/src/assets/js/db.js', revision: '1' },
    { url: '/src/assets/js/detail-team.js', revision: '1' },
    { url: '/src/assets/js/footer.js', revision: '1' },
    { url: '/src/assets/js/home.js', revision: '1' },
    { url: '/src/assets/js/idb.js', revision: '1' },
    { url: '/src/assets/js/materialize.min.js', revision: '1' },
    { url: '/src/assets/js/nav.js', revision: '1' },
    { url: '/src/assets/js/sw-register.js', revision: '1' },
    { url: '/service-worker.js', revision: '1' },
    { url: '/manifest.json', revision: '1' },
    { url: '/src/assets/images/logo.png', revision: '1' },
    { url: '/src/assets/images/crew.png', revision: '1' },
    { url: '/src/assets/images/default-logo.svg', revision: '1' },
    { url: '/src/assets/images/heading.svg', revision: '1' },
    { url: '/src/assets/images/icon-512x512.png', revision: '1' },
    { url: '/src/assets/images/icon-192x192.png', revision: '1' },
    { url: '/src/assets/images/icon-filled-192x192.png', revision: '1' },
    { url: '/src/assets/images/maskable_icon.png', revision: '1' },
    { url: '/src/assets/images/icon.png', revision: '1' },
    { url: '/src/assets/images/warning.png', revision: '1' },
    { url: '/src/assets/images/404.png', revision: '1' },
  ],
  {
    ignoreUrlParametersMatching: [/.*/],
  }
);

workbox.routing.registerRoute(
  new RegExp('/src/pages/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'pages',
  })
);

workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'premier-league-api',
  })
);

workbox.routing.registerRoute(
  new RegExp('https://crests.football-data.org'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'premier-league-image',
  })
);

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
