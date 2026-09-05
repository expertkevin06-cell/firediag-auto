const BASE_PATH = '/firediag-auto';
const CACHE_NAME = 'firediag-v4';

const urlsToCache = [
    BASE_PATH + '/',
    BASE_PATH + '/index.html',
    BASE_PATH + '/manifest.json',
    BASE_PATH + '/css/style.css',
    BASE_PATH + '/js/config.js',
    BASE_PATH + '/js/auth.js',
    BASE_PATH + '/js/database.js',
    BASE_PATH + '/js/gemini.js',
    BASE_PATH + '/js/pdf.js',
    BASE_PATH + '/js/tokens.js',
    BASE_PATH + '/js/app.js',
    BASE_PATH + '/js/service-worker-register.js',
    BASE_PATH + '/images/icon-192.png',
    BASE_PATH + '/images/icon-512.png'
];

self.addEventListener('install', event => {
    console.log('[SW] Installation du Service Worker');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[SW] Cache ouvert');
                return cache.addAll(urlsToCache);
            })
            .catch(err => {
                console.error('[SW] Erreur cache:', err);
            })
    );
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    console.log('[SW] Activation du Service Worker');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[SW] Suppression ancien cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') return;

    const url = new URL(event.request.url);
    
    // Images externes (Unsplash)
    if (url.hostname.includes('unsplash.com') || url.pathname.includes('images/')) {
        event.respondWith(
            caches.match(event.request)
                .then(cachedResponse => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }
                    return fetch(event.request).then(response => {
                        if (response && response.status === 200) {
                            const responseClone = response.clone();
                            caches.open(CACHE_NAME).then(cache => {
                                cache.put(event.request, responseClone);
                            });
                        }
                        return response;
                    }).catch(() => {
                        return new Response('', { status: 404, statusText: 'Not Found' });
                    });
                })
        );
    } 
    // HTML
    else if (event.request.headers.get('accept')?.includes('text/html')) {
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    if (response && response.status === 200) {
                        const responseClone = response.clone();
                        caches.open(CACHE_NAME).then(cache => {
                            cache.put(event.request, responseClone);
                        });
                    }
                    return response;
                })
                .catch(() => {
                    return caches.match(BASE_PATH + '/index.html');
                })
        );
    } 
    // Autres ressources
    else {
        event.respondWith(
            caches.match(event.request)
                .then(response => {
                    if (response) {
                        return response;
                    }
                    return fetch(event.request).then(response => {
                        if (response && response.status === 200) {
                            const responseClone = response.clone();
                            caches.open(CACHE_NAME).then(cache => {
                                cache.put(event.request, responseClone);
                            });
                        }
                        return response;
                    });
                })
        );
    }
});

console.log('[SW] Service Worker FireDiag Auto chargé');
