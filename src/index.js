import 'babel-polyfill';
import '@/assets/stylesheets/index.sass';

import { db, fetchMessagingToken, messaging } from '@/firebase';
import { render } from '@/render';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import runtime from 'serviceworker-webpack-plugin/lib/runtime';

let token;

fetchMessagingToken().then(tok => {
  token = tok;
});

if ('serviceWorker' in navigator) {
  runtime.register().then(registration => {
    messaging.useServiceWorker(registration);
  });
}

db.collection('users')
  .get()
  .then(function(querySnapshot) {
    let docs = 0;
    let counter = 0;
    querySnapshot.forEach(function(doc) {
      counter += 1;
      if (doc.data().token != token) {
        docs += 1;
      }
    });
    if (docs === counter) {
      db.collection('users').add({
        token: token,
      });
    }
  });

const snapshots$ = Observable.create(observer =>
  db
    .collection('tweets')
    .orderBy('created_at')
    .onSnapshot(observer)
);
const tweets$ = snapshots$.pipe(
  map(snapshot => snapshot.docs.map(s => ({ tweet_id: s.id, ...s.data() })))
);
const state$ = tweets$.pipe(map(tweets => ({ tweets })));

state$.subscribe(render);
