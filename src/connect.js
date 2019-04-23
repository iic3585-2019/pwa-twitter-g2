import { db } from '@/db';

import { fromEvent } from 'rxjs';

import firebase from 'firebase/app';
import 'firebase/firestore';

import fetch from 'node-fetch';

const pushTweet = body => {

  const notifications = {
    notification: {
      title : "titulo",
      body : "mensajillo",
      click_action: "http://localhost:8080/",
      icon: "https://atlas-content-cdn.pixelsquid.com/stock-images/pointer-computer-icon-B5mDxM2-600.jpg"
    },
    "to" : "fz-G7axQ4mc:APA91bF2r6JgjL9Xyoq0-tI64_ipyZT5NTghJKuwvPvzxaWilvbDCp5tj-euw7b-oO294noukr9ehhpqrX5ymqpO1QAdSZdP6rKlKfsYCYh1D07dgD3koVrwPlxLAxsddCIP4cmq_HWA"
  }
  fetch('https://fcm.googleapis.com/fcm/send', {
    method: 'POST',
    body: JSON.stringify(notifications),
    mode: 'no-cors',
    headers: {
      'Authorization': 'key=AAAAwCk0ixQ:APA91bEm5zrDh3CE9MLXP5QcBBUxpFL3ZPuKTo6QB2fAMSyRjfrBAJJZQ9gjws4PJGmCf_QFAsoMtH_LJruSBeLbiIxbtDLvj3ujb9QSAYRqeTFPyEUB767Hdn3bvReUSQ1xirKGvnhY',
      'Content-Type': 'application/json'
    }
  }).then(
    console.log("notificacion")
  );




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
