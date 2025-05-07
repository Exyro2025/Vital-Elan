self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('vital-elan-cache').then((cache) => {
      return cache.addAll([
        './',
        './index.html',
        './style.css',
        './main.js',
        './manifest.json',
        './sounds/sound1.mp3', // Add all sound file paths here
        './icons/icon-192x192.png',
        './icons/icon-512x512.png'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
