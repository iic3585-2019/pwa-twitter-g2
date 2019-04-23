import axios from 'axios';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/messaging';

const FCM_URI = 'https://fcm.googleapis.com/fcm/send';
const FCM_KEY =
  'AAAAwCk0ixQ:APA91bEm5zrDh3CE9MLXP5QcBBUxpFL3ZPuKTo6QB2fAMSyRjfrBAJJZQ9gjws4PJGmCf_QFAsoMtH_LJruSBeLbiIxbtDLvj3ujb9QSAYRqeTFPyEUB767Hdn3bvReUSQ1xirKGvnhY';

// Firebase setup
const config = {
  apiKey: 'AIzaSyDPyYczw1sWppmj_MNqQAyROTgydtd1aN4',
  authDomain: 'pwa-twitter-4ddd4.firebaseapp.com',
  databaseURL: 'https://pwa-twitter-4ddd4.firebaseio.com',
  projectId: 'pwa-twitter-4ddd4',
  storageBucket: 'pwa-twitter-4ddd4.appspot.com',
  messagingSenderId: '825325030164',
};
firebase.initializeApp(config);

export const db = firebase.firestore();
export const messaging = firebase.messaging();

const buildNotification = (title, body, to) => {
  const icon =
    'https://atlas-content-cdn.pixelsquid.com/stock-images/pointer-computer-icon-B5mDxM2-600.jpg';

  return { notification: { title, body, icon }, to };
};

export const pushNotification = (body, token) => {
  const notification = buildNotification('Notificación', body, token);

  axios.post(FCM_URI, notification, {
    headers: {
      Authorization: `key=${FCM_KEY}`,
      'Content-Type': 'application/json',
    },
  });
};

export const pushTweet = body => {
  const token =
    'dHqTyeIFZKQ:APA91bEKygiNIXkGzKlWcvRJw2PKW5eCLOrlOo6M1mj9RrtZYl72vsbOtNmviJ1vEjv41cV6C3SUQ0EVEW6_x4sa8iLYjbKpk85rK4o4q6Y4jrT-hz3R9DOZQCCpTxHspk4yzGf-SIe1';

  pushNotification(body, token);

  return db.collection('tweets').add({
    body,
    likes: 0,
    created_at: firebase.firestore.FieldValue.serverTimestamp(),
  });
};

export const pushComment = (tweetId, body) => {
  return db.collection('comments').add({
    tweet_id: tweetId,
    body,
    created_at: firebase.firestore.FieldValue.serverTimestamp(),
  });
};
