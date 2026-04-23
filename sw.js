const CACHE_NAME = 'aether-clinic-v1';

const urlsToCache = [
'/a/',
'/a/index.html',
'/a/home.html',
'/a/add_customer.html',
'/a/add_guarantor.html',
'/a/add_installment.html',
'/a/add_material.html',
'/a/customers.html',
'/a/edit_customer.html',
'/a/edit_guarantor.html',
'/a/edit_installment.html',
'/a/edit_material.html',
'/a/guarantors.html',
'/a/incomplete_installments.html',
'/a/installments.html',
'/a/materials.html',
'/a/store.html',
'/a/view_customer.html',
'/a/view_guarantor.html',
'/a/view_installment.html',
'/a/view_material.html',
'/a/manifest.json',
'/a/icon-192.png',
'/a/icon-512.png',

'https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700&display=swap',
'https://fonts.googleapis.com/icon?family=Material+Icons+Round'
];

self.addEventListener('install', event => {
event.waitUntil(
caches.open(CACHE_NAME)
.then(cache => cache.addAll(urlsToCache))
);
});

self.addEventListener('fetch', event => {
event.respondWith(
caches.match(event.request)
.then(response =>
response ||
fetch(event.request).catch(() =>
caches.match('/a/index.html')
)
)
);
});

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