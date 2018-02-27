importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js'
);

// Workbox will populate this list (as defined in workbox-config.js) during build.
workbox.precaching.precacheAndRoute([]);

workbox.routing.registerRoute(
  new RegExp('/api/(.*)'),
  workbox.strategies.networkFirst({
    networkTimetoutSeconds: 3,
    cacheName: 'api',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 100
      })
    ]
  })
);

// Google font css and woff2 files
workbox.routing.registerRoute(
  new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
  workbox.strategies.cacheFirst({
    cacheName: 'googlefonts',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 5
      })
    ]
  })
);

// Font Awesome css and woff2 files
workbox.routing.registerRoute(
  new RegExp('https://maxcdn.bootstrapcdn.com/font-awesome/(.*)'),
  workbox.strategies.cacheFirst({
    cacheName: 'fontawesome',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 20
      })
    ]
  })
);

// Cloudinary images. We won't cache cloudinary widget script (from widget.cloudinary.com) for uploading images b/c it doesn't support CORS.
workbox.routing.registerRoute(
  new RegExp('https://res.cloudinary.com/(.*)'),
  workbox.strategies.cacheFirst({
    cacheName: 'cloudinary',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 200
        // maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days (perhaps a bug in workbox? the moment i set maxAgentSeconds, it no longer finds resource in cache)
      })
    ]
  })
);

workbox.routing.registerRoute(
  /\.(?:js|css)$/,
  workbox.strategies.cacheFirst({
    cacheName: 'static-resources',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
      })
    ]
  })
);

// this can only be used if index.html is pre-cached,
// otherwise `an object that was not a Response was passed to respondWith()` error will be shown in Console and page won't load

// commenting the following route out b/c we get a syntax error: Uncaught SyntaxError: Unexpected token

// workbox.routing.registerRoute(
//   ({ url, e }) => url.pathname === '/profile' || '/subscription',
//   ({ url, e }) => self.caches.match('index.html')
// );

self.addEventListener('push', e => {
  var payload = e.data.json();
  e.waitUntil(
    self.registration.showNotification(payload.title, {
      body: payload.message,
      icon: payload.icon,
      // badge: '',
      data: payload,
      actions: [
        { action: 'view', title: 'View Post' /*, icon: ''*/ },
        { action: 'app', title: 'Open App' /*, icon: ''*/ }
      ]
    })
  );
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  var payload = e.notification.data;

  switch (e.action) {
    case 'app':
      e.waitUntil(clients.openWindow(e.target.location.origin));
      break;
    case 'view':
    default:
      e.waitUntil(
        clients.openWindow(
          `${e.target.location.origin}/posts/${payload.postId}`
        )
      );
  }
});
