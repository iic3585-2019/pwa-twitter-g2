import runtime from 'serviceworker-webpack-plugin/lib/runtime';

// Stylesheets
import '@/assets/stylesheets/index.sass';

if ('serviceWorker' in navigator) {
  const registration = runtime.register();
}
