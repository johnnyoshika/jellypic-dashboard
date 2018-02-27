importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js'
);

// Workbox will populate this list (as defined in workbox-config.js) during build.
workbox.precaching.precacheAndRoute([]);

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
