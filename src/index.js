import { db } from '@/db';
import { renderTimeline } from '@/render';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import runtime from 'serviceworker-webpack-plugin/lib/runtime';

import _ from 'lodash';

// Stylesheets
import '@/assets/stylesheets/index.sass';

// Service Worker setup
if ('serviceWorker' in navigator) {
  const registration = runtime.register();
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
