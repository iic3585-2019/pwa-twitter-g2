import { db } from '@/db';

import { fromEvent } from 'rxjs';

import firebase from 'firebase/app';
import 'firebase/firestore';

import axios from 'axios';

const pushTweet = body => {
  const notifications = {
    notification: {
      title: 'Notification',
      body,
      icon:
        'https://atlas-content-cdn.pixelsquid.com/stock-images/pointer-computer-icon-B5mDxM2-600.jpg',
    },
    to:
      'dHqTyeIFZKQ:APA91bEKygiNIXkGzKlWcvRJw2PKW5eCLOrlOo6M1mj9RrtZYl72vsbOtNmviJ1vEjv41cV6C3SUQ0EVEW6_x4sa8iLYjbKpk85rK4o4q6Y4jrT-hz3R9DOZQCCpTxHspk4yzGf-SIe1',
  };

  axios
    .post('https://fcm.googleapis.com/fcm/send', notifications, {
      headers: {
        Authorization:
          'key=AAAAwCk0ixQ:APA91bEm5zrDh3CE9MLXP5QcBBUxpFL3ZPuKTo6QB2fAMSyRjfrBAJJZQ9gjws4PJGmCf_QFAsoMtH_LJruSBeLbiIxbtDLvj3ujb9QSAYRqeTFPyEUB767Hdn3bvReUSQ1xirKGvnhY',
        'Content-Type': 'application/json',
      },
    })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });

  return db.collection('tweets').add({
    body,
    likes: 0,
    created_at: firebase.firestore.Timestamp.fromDate(new Date()),
  });
};

const getKeyCode = event => event.keycode || event.which;

export const connectInput = element => {
  fromEvent(document, 'keyup').subscribe(event => {
    if (getKeyCode(event) === 13) {
      const body = element.value;

      pushTweet(body);
    }
  });
};

const pushComment = (tweet_id, body) => {
  return db.collection('comments').add({
    tweet_id: '1',
    body,
    created_at: firebase.firestore.Timestamp.fromDate(new Date()),
  });
};

export const connectComment = (element, tweetId) => {
  fromEvent(element, 'click').subscribe(() => {
    const body = prompt('Cuerpo del comentario');

    pushComment(tweetId, body);
  });
};
