import 'babel-polyfill';
import '@/assets/stylesheets/index.sass';

import { db, fetchMessagingToken, messaging } from '@/firebase';
import { render } from '@/render';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import runtime from 'serviceworker-webpack-plugin/lib/runtime';

const token = fetchMessagingToken();

// Service Worker setup
if ('serviceWorker' in navigator) {
  runtime.register().then(registration => {
    messaging.useServiceWorker(registration);
  });
}

const snapshots$ = Observable.create(observer =>
  db
    .collection('tweets')
    .orderBy('created_at')
    .onSnapshot(observer)
);
const tweets$ = snapshots$.pipe(
  map(snapshot => snapshot.docs.map(s => s.data()))
);
const state$ = tweets$.pipe(map(tweets => ({ tweets })));

state$.subscribe(render);
