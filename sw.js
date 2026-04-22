const CACHE_NAME = 'aether-clinic-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/home.html',
  '/add_customer.html',
  '/add_guarantor.html',
  '/add_installment.html',
  '/add_material.html',
  '/customers.html',
  '/edit_customer.html',
  '/edit_guarantor.html',
  '/edit_installment.html',
  '/edit_material.html',
  '/guarantors.html',
  '/incomplete_installments.html',
  '/installments.html',
  '/materials.html',
  '/store.html',
  '/view_customer.html',
  '/view_guarantor.html',
  '/view_installment.html',
  '/view_material.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  'https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700&display=swap',
  'https://fonts.googleapis.com/icon?family=Material+Icons+Round'
];

// Install
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Fetch - cache-first for assets, network-fallback offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request)
        .catch(() => caches.match('/index.html')))
  );
});

// Activate - cleanup old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => 
      Promise.all(
        cacheNames.map(cache => 
          cache !== CACHE_NAME && caches.delete(cache)
        )
      )
    )
  );
});
