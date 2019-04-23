import { pushComment, pushNotification, pushTweet } from '@/db';

import { fromEvent, Subject } from 'rxjs';

const bus$ = new Subject();
bus$.subscribe({
  next: e => {
    if (e.type === 'PUSH_TWEET') {
      const { body } = e.payload;

      pushTweet(body);
    } else if (e.type === 'PUSH_COMMENT') {
      const { tweetId, body } = e.payload;

      pushComment(tweetId, body);
    }
  },
});

export const connectInput = element => {
  const getKeyCode = event => event.keycode || event.which;

  element.addEventListener('keypress', event => {
    if (getKeyCode(event) === 13) {
      const body = element.value;

      bus$.next({
        type: 'PUSH_TWEET',
        payload: { body },
      });
    }
  });
};

export const connectComment = (element, tweetId) => {
  element.addEventListener('click', () => {
    const body = prompt('Comentario');

    bus$.next({
      type: 'PUSH_COMMENT',
      payload: { tweetId, body },
    });
  });
};
