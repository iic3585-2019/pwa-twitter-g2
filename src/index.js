import 'babel-polyfill';
import '@/assets/stylesheets/index.sass';

import { db } from '@/db';
import { renderTimeline } from '@/render';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import firebase from 'firebase/app';
import 'firebase/messaging';

const fetchMessagingToken = async () => {
  const messaging = firebase.messaging();
  await messaging.requestPermission();
  const token = await messaging.getToken();

  return token;
};

const token = fetchMessagingToken();
// console.log(token);

// Service Worker setup
if ('serviceWorker' in navigator) {
  runtime.register().then(registration => {
    firebase.messaging().useServiceWorker(registration);
  });
}

// Observables =================================================================
const snapshots$ = Observable.create(observer =>
  db
    .collection('tweets')
    .orderBy('created_at')
    .onSnapshot(observer)
);

const tweets$ = snapshots$.pipe(
  map(snapshot => snapshot.docs.map(s => s.data()))
);

tweets$.subscribe(renderTimeline);
