import { Observable, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import '@/assets/stylesheets/index.sass';
import mustache from 'mustache';

// Firebase setup
import firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyDPyYczw1sWppmj_MNqQAyROTgydtd1aN4',
  authDomain: 'pwa-twitter-4ddd4.firebaseapp.com',
  databaseURL: 'https://pwa-twitter-4ddd4.firebaseio.com',
  projectId: 'pwa-twitter-4ddd4',
  storageBucket: 'pwa-twitter-4ddd4.appspot.com',
  messagingSenderId: '825325030164',
};
firebase.initializeApp(config);

// Service Worker setup
if ('serviceWorker' in navigator) {
  const registration = runtime.register();
}

const db = firebase.firestore();

const snapshots$ = Observable.create(observer =>
  db
    .collection('tweets')
    .orderBy('created_at')
    .onSnapshot(observer)
);

const tweets$ = snapshots$.pipe(
  map(snapshot => snapshot.docs.map(s => s.data()))
);

const getTemplateById = id => {
  return document.getElementById(id).innerHTML;
};

const renderTweet = tweet => {
  const template = getTemplateById('template-1');
  const render = mustache.render(template, tweet);

  return render;
};

const renderTimeline = tweets => {
  const render = tweets.map(renderTweet);

  return render;
};

tweets$.subscribe(renderTimeline);

const pushComment = (tweet_id, body) => {
  return db.collection('comments').add({ tweet_id: '1', body });
};

const pushTweet = body => {
  return ref.push({ body, likes });
};

// Create Tweet
const getKeyCode = event => event.keycode || event.which;

fromEvent(document, 'keyup').subscribe(event => {
  if (getKeyCode(event) === 13) {
    const body = document.querySelector('input').value;

    pushTweet(body);
  }
});

// Comment Tweet
const button = document.querySelector('.comment-btn');

fromEvent(button, 'click').subscribe(() => {
  const body = prompt('Cuerpo del comentario');

  pushComment('hola', body).then(a => {
    console.log(a);
  });
});
