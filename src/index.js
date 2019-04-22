import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import { fromEvent } from 'rxjs';

// Firebase setup
import firebase from 'firebase/app';
import 'firebase/database';

// Stylesheets
import '@/assets/stylesheets/index.sass';

firebase.initializeApp({
  apiKey: 'AIzaSyDPyYczw1sWppmj_MNqQAyROTgydtd1aN4',
  authDomain: 'pwa-twitter-4ddd4.firebaseapp.com',
  databaseURL: 'https://pwa-twitter-4ddd4.firebaseio.com',
  storageBucket: 'pwa-twitter-4ddd4.appspot.com',
});

// Service Worker setup
if ('serviceWorker' in navigator) {
  const registration = runtime.register();
}

const getKeyCode = (event) => event.keycode || event.which;
//Create Tweet
fromEvent(document, 'keyup')
  .subscribe((event) => {
    if (getKeyCode(event) === 13){
      const text = document.querySelector('input').value;
      console.log(text);
    }
  });
