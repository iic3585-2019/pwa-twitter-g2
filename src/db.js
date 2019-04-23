import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/messaging';

// Firebase setup
const config = {
  apiKey: "AIzaSyDPyYczw1sWppmj_MNqQAyROTgydtd1aN4",
  authDomain: "pwa-twitter-4ddd4.firebaseapp.com",
  databaseURL: "https://pwa-twitter-4ddd4.firebaseio.com",
  projectId: "pwa-twitter-4ddd4",
  storageBucket: "pwa-twitter-4ddd4.appspot.com",
  messagingSenderId: "825325030164"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();

export const db = firebase.firestore();
