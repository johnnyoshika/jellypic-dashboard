importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js'
);

var version = 'v2';

self.addEventListener('activate', e => {
  // Claim clients that aren't already under its control.
  // Useful for new sw installation, as the page that registered the service worker for the first time won't be controlled until it's loaded again.
  self.clients.claim();
});

self.addEventListener('message', e => {
  if (!e.data) return;

  switch (e.data) {
    case 'skipWaiting':
      self.skipWaiting();
      break;
    default:
      break;
  }
});

workbox.core.setCacheNameDetails({
  suffix: version
});

// Workbox will populate this list (as defined in workbox-config.js) during build.
workbox.precaching.precacheAndRoute([]);

workbox.routing.registerRoute(
  new RegExp('/api/(.*)'),
  workbox.strategies.networkFirst({
    networkTimetoutSeconds: 5, // sadly this doesn't seem to work
    cacheName: 'api-' + version,
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 100
      }),
      {
        cacheDidUpdate: async ({
          cacheName,
          request,
          oldResponse,
          newResponse
        }) => {
          const clients = await self.clients.matchAll();
          for (const client of clients)
            client.postMessage({
              type: 'api-updates',
              url: request.url,
              cacheName
            });
        }
      }
    ]
  })
);

// Google font css and woff2 files
workbox.routing.registerRoute(
  new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
  workbox.strategies.cacheFirst({
    cacheName: 'googlefonts-' + version,
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
    cacheName: 'fontawesome-' + version,
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
    cacheName: 'cloudinary-' + version,
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
    cacheName: 'static-resources-' + version,
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
      })
    ]
  })
);

// make sure 'index.html' is pre-cached, otherwise we'll see a 'an object that was not a Response was passed to respondWith()' error in Console and page won't load.
workbox.routing.registerNavigationRoute('/index.html');

self.addEventListener('push', e => {
  var payload = e.data.json();
  e.waitUntil(
    self.registration.showNotification(payload.title, {
      body: payload.message,
      icon: payload.icon,
      image: payload.image,
      badge: '/icons/android-chrome-192x192.png',
      data: payload,
      actions: [
        {
          action: 'view',
          title: 'View Post',
          icon: '/icons/picture-128x128.png'
        },
        {
          action: 'app',
          title: 'Open App',
          icon: '/icons/android-chrome-192x192.png'
        }
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
