self.addEventListener('install', function(registration) {});

self.addEventListener('activate', event => {});

self.addEventListener('fetch', function(event) {
  console.log('Fetch', event.request);
});
