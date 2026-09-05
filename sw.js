const BASE = '/firediag-auto';
const CACHE_NAME = 'firediag-v4';

const urlsToCache = [
    BASE + '/',
    BASE + '/index.html',
    BASE + '/manifest.json',
    BASE + '/css/style.css',
    BASE + '/js/config.js',
    BASE + '/js/auth.js',
    BASE + '/js/database.js',
    BASE + '/js/gemini.js',
    BASE + '/js/pdf.js',
    BASE + '/js/tokens.js',
    BASE + '/js/app.js',
    BASE + '/js/service-worker-register.js',
    BASE + '/images/icon-192.png',
    BASE + '/images/icon-512.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
            .catch(err => console.log('Erreur cache:', err))
    );
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) return caches.delete(cacheName);
                })
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') return;

    if (event.request.url.includes('unsplash.com') || event.request.url.includes('images/')) {
        event.respondWith(
            caches.match(event.request)
                .then(cached => cached || fetch(event.request).then(response => {
                    if (response && response.status === 200) {
                        const clone = response.clone();
                        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                    }
                    return response;
                }).catch(() => new Response('', { status: 404 })))
        );
    } else if (event.request.headers.get('accept')?.includes('text/html')) {
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                    return response;
                })
                .catch(() => caches.match(BASE + '/index.html'))
        );
    } else {
        event.respondWith(
            caches.match(event.request)
                .then(cached => cached || fetch(event.request).then(response => {
                    if (response && response.status === 200) {
                        const clone = response.clone();
                        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                    }
                    return response;
                }))
        );
    }
});
