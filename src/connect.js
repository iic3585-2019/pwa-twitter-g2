import { db } from '@/db';

import { fromEvent } from 'rxjs';

import firebase from 'firebase/app';
import 'firebase/firestore';

const pushTweet = body => {

  const notification = {
    notification : {
      body
    },
    to : 'f9VC9GG3ojs:APA91bFLPE900eNcrYyWhqIHe0khGHHxy4KmsTqM2WYceSwloPILPVLEAB4QekEPC91l9CFMn7KQb8U_yCl108NBVkJWSMsAfaiKY7e8lS3uK19P9DJ3nAefNQ9X8DQWh5mDDGYIYvYd'
  }
  fetch('https://fcm.googleapis.com/fcm/send', {
    method: 'POST',
    body: JSON.stringify(notification),
    headers:{
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:8080',
      'Authorization': 'key=AAAAwCk0ixQ:APA91bEm5zrDh3CE9MLXP5QcBBUxpFL3ZPuKTo6QB2fAMSyRjfrBAJJZQ9gjws4PJGmCf_QFAsoMtH_LJruSBeLbiIxbtDLvj3ujb9QSAYRqeTFPyEUB767Hdn3bvReUSQ1xirKGvnhY'
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
