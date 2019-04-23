importScripts: ['./bower_components/sw-toolbox/sw-toolbox.js', 'path/to/your/custom-sw-caching.js']

importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyDPyYczw1sWppmj_MNqQAyROTgydtd1aN4",
  authDomain: "pwa-twitter-4ddd4.firebaseapp.com",
  databaseURL: "https://pwa-twitter-4ddd4.firebaseio.com",
  projectId: "pwa-twitter-4ddd4",
  storageBucket: "pwa-twitter-4ddd4.appspot.com",
  messagingSenderId: "825325030164"
});
const messaging = firebase.messaging();


self.addEventListener('install', function(registration) {});

self.addEventListener('activate', event => {});

self.addEventListener('fetch', function(event) {
  console.log('Fetch', event.request);
});
