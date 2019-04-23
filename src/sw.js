importScripts: ['./bower_components/sw-toolbox/sw-toolbox.js'];

// Workbox
importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/4.2.0/workbox-sw.js'
);

if (workbox) {
  workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

  workbox.routing.registerRoute(
    /\.(gif|jpg|png|svg)$/,
    new workbox.strategies.CacheFirst({
      cacheName: 'image-cache',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 20,
          maxAgeSeconds: 7 * 24 * 60 * 60,
        }),
      ],
    })
  );

  workbox.routing.registerRoute(
    /\.css$/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'css-cache',
    })
  );
}

// Firebase messaging
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: 'AIzaSyDPyYczw1sWppmj_MNqQAyROTgydtd1aN4',
  authDomain: 'pwa-twitter-4ddd4.firebaseapp.com',
  databaseURL: 'https://pwa-twitter-4ddd4.firebaseio.com',
  projectId: 'pwa-twitter-4ddd4',
  storageBucket: 'pwa-twitter-4ddd4.appspot.com',
  messagingSenderId: '825325030164',
});

const messaging = firebase.messaging();
