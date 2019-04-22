import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import { fromEvent } from 'rxjs';

// Firebase setup
import firebase from 'firebase/app';
import 'firebase/database';

// Stylesheets
import '@/assets/stylesheets/index.sass';

const config = {
  apiKey: "AIzaSyDPyYczw1sWppmj_MNqQAyROTgydtd1aN4",
  authDomain: "pwa-twitter-4ddd4.firebaseapp.com",
  databaseURL: "https://pwa-twitter-4ddd4.firebaseio.com",
  projectId: "pwa-twitter-4ddd4",
  storageBucket: "pwa-twitter-4ddd4.appspot.com",
  messagingSenderId: "825325030164"
};
firebase.initializeApp(config);

// Service Worker setup
if ('serviceWorker' in navigator) {
  const registration = runtime.register();
}

console.log("aca se muestra toda la database");
const database = firebase.database();

const ref = database.ref('tweets');

console.log("los tweets");

console.log(ref);

const getKeyCode = (event) => event.keycode || event.which;
//Create Tweet
fromEvent(document, 'keyup')
  .subscribe((event) => {
    if (getKeyCode(event) === 13){
      const text = document.querySelector('input').value;
      const data = {
        body: text,
        likes: 0
      };
      ref.push(data);
      console.log(text);
    }
  });
