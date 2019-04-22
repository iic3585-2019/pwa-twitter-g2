import { db } from '@/db';

import { fromEvent } from 'rxjs';

import firebase from 'firebase/app';
import 'firebase/firestore';

const pushTweet = body => {
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
