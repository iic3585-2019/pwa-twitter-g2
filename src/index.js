import { db } from '@/db';
import { renderTimeline } from '@/render';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import firebase from 'firebase/app';
import 'firebase/messaging';
import 'babel-polyfill';

// Stylesheets
import '@/assets/stylesheets/index.sass';

// Service Worker setup
if ('serviceWorker' in navigator) {
  runtime.register().then(registration => {
    firebase.messaging().useServiceWorker(registration);
  });
}

const askNotifications = async () => {
  try{
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log(token);
    return token;
  }  catch (error) {
    console.error(error);
  }
}

console.log("este es el token");
const token = askNotifications();
console.log(token);

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


// TODO:
// - Guardar tweets en cache
// - Cuando se crea un tweet, se envia una notificación
