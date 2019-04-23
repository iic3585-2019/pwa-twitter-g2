import { db } from '@/db';

import axios from 'axios';

import { fromEvent } from 'rxjs';

import firebase from 'firebase/app';
import 'firebase/firestore';

const FCM_URI = 'https://fcm.googleapis.com/fcm/send';
const FCM_KEY =
  'AAAAwCk0ixQ:APA91bEm5zrDh3CE9MLXP5QcBBUxpFL3ZPuKTo6QB2fAMSyRjfrBAJJZQ9gjws4PJGmCf_QFAsoMtH_LJruSBeLbiIxbtDLvj3ujb9QSAYRqeTFPyEUB767Hdn3bvReUSQ1xirKGvnhY';

const buildNotification = (title, body, to) => {
  const icon =
    'https://atlas-content-cdn.pixelsquid.com/stock-images/pointer-computer-icon-B5mDxM2-600.jpg';

  return { notification: { title, body, icon }, to };
};

const pushNotification = (body, token) => {
  const notification = buildNotification('Notificación', body, token);

  axios.post(FCM_URI, notification, {
    headers: {
      Authorization: `key=${FCM_KEY}`,
      'Content-Type': 'application/json',
    },
  });
};

const pushTweet = body => {
  const token =
    'dHqTyeIFZKQ:APA91bEKygiNIXkGzKlWcvRJw2PKW5eCLOrlOo6M1mj9RrtZYl72vsbOtNmviJ1vEjv41cV6C3SUQ0EVEW6_x4sa8iLYjbKpk85rK4o4q6Y4jrT-hz3R9DOZQCCpTxHspk4yzGf-SIe1';

  pushNotification(body, token);

  return db.collection('tweets').add({
    body,
    likes: 0,
    created_at: firebase.firestore.Timestamp.fromDate(new Date()).seconds,
  });
};

export const connectInput = element => {
  const getKeyCode = event => event.keycode || event.which;

  fromEvent(document, 'keyup').subscribe(event => {
    if (getKeyCode(event) === 13) {
      const body = element.value;

      pushTweet(body);
    }
  });
};

const pushComment = (tweetId, body) => {
  return db.collection('comments').add({
    tweet_id: tweetId,
    body,
    created_at: firebase.firestore.Timestamp.fromDate(new Date()).seconds,
  });
};

export const connectComment = (element, tweetId) => {
  fromEvent(element, 'click').subscribe(() => {
    const body = prompt('Comentario');

    pushComment(tweetId, body);
  });
};
