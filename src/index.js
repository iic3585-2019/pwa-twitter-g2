import runtime from 'serviceworker-webpack-plugin/lib/runtime';

import { fromEvent } from 'rxjs';

// Stylesheets
import '@/assets/stylesheets/index.sass';

if ('serviceWorker' in navigator) {
  const registration = runtime.register();
}

const getKeyCode = (event) => event.keycode || event.which;
//Create Tweet
fromEvent(document, 'keyup')
  .subscribe((event) => {
    if (getKeyCode(event) === 13){
      const text = document.querySelector('input').value;
      console.log(text);
    }
  });

