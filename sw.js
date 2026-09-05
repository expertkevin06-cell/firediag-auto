// Service Worker FireDiag Auto - Version 3
// Gestion du cache pour mode hors ligne complet

const CACHE_NAME = 'firediag-v3';
const APP_VERSION = '1.0.0';

// Ressources à mettre en cache lors de l'installation
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/css/style.css',
    '/js/config.js',
    '/js/auth.js',
    '/js/database.js',
    '/js/gemini.js',
    '/js/pdf.js',
    '/js/tokens.js',
    '/js/app.js',
    '/js/service-worker-register.js',
    // Icônes de l'application
    '/images/icon-192.png',
    '/images/icon-512.png',
    // Photos des fiches techniques
    '/images/court-circuit.jpg',
    '/images/surchauffe.jpg',
    '/images/surcharge.jpg',
    '/images/echappement.jpg',
    '/images/fap.jpg',
    '/images/batterie-bt.jpg',
    '/images/batterie-ht.jpg',
    '/images/consommation.jpg',
    '/images/cables.jpg',
    '/images/cosses.jpg',
    '/images/feu-criminel.jpg'
];

// Librairies externes à mettre en cache
const externalUrlsToCache = [
    'https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js',
    'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth-compat.js',
    'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-compat.js',
    'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'
];

// ============================================
// INSTALLATION : Mise en cache des ressources
// ============================================
self.addEventListener('install', event => {
    console.log('[SW] Installation du Service Worker v' + APP_VERSION);
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[SW] Cache ouvert : ' + CACHE_NAME);
                // Mettre en cache les ressources locales
                return cache.addAll(urlsToCache).then(() => {
                    console.log('[SW] Ressources locales mises en cache');
                    // Mettre en cache les ressources externes
                    return cache.addAll(externalUrlsToCache).then(() => {
                        console.log('[SW] Ressources externes mises en cache');
                    }).catch(err => {
                        console.warn('[SW] Certaines ressources externes n\'ont pas pu être mises en cache:', err);
                    });
                });
            })
            .catch(err => {
                console.error('[SW] Erreur lors de la mise en cache:', err);
            })
    );
    self.skipWaiting();
});

// ============================================
// ACTIVATION : Nettoyage des anciens caches
// ============================================
self.addEventListener('activate', event => {
    console.log('[SW] Activation du Service Worker');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[SW] Suppression ancien cache : ' + cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('[SW] Service Worker activé');
            return self.clients.claim();
        })
    );
});

// ============================================
// FETCH : Stratégie de cache intelligente
// ============================================
self.addEventListener('fetch', event => {
    // Ignorer les requêtes non-GET
    if (event.request.method !== 'GET') return;
    
    // Ignorer les requêtes Firebase (elles ont leur propre cache)
    if (event.request.url.includes('firebaseio.com') || 
        event.request.url.includes('googleapis.com')) {
        return;
    }

    const url = event.request.url;
    
    // Stratégie différente selon le type de ressource
    if (url.includes('unsplash.com') || url.includes('images/')) {
        // IMAGES : Cache First avec fallback réseau
        event.respondWith(
            caches.match(event.request)
                .then(cachedResponse => {
                    if (cachedResponse) {
                        console.log('[SW] Image depuis le cache :', url);
                        return cachedResponse;
                    }
                    console.log('[SW] Image depuis le réseau :', url);
                    return fetch(event.request).then(response => {
                        if (response && response.status === 200) {
                            const responseClone = response.clone();
                            caches.open(CACHE_NAME).then(cache => {
                                cache.put(event.request, responseClone);
                            });
                        }
                        return response;
                    }).catch(() => {
                        // Fallback : image placeholder
                        return new Response('', {
                            status: 404,
                            statusText: 'Image non disponible'
                        });
                    });
                })
        );
    } else if (event.request.headers.get('accept')?.includes('text/html')) {
        // HTML : Network First avec fallback cache
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
                    console.log('[SW] HTML depuis le cache (offline)');
                    return caches.match('/index.html');
                })
        );
    } else if (url.includes('cdnjs.cloudflare.com') || url.includes('gstatic.com')) {
        // LIBRAIRIES EXTERNES : Cache First
        event.respondWith(
            caches.match(event.request)
                .then(response => {
                    if (response) {
                        console.log('[SW] Librairie depuis le cache :', url);
                        return response;
                    }
                    console.log('[SW] Librairie depuis le réseau :', url);
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
    } else {
        // AUTRES RESSOURCES : Cache First avec fallback réseau
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

// ============================================
// BACKGROUND SYNC : Synchronisation des fiches
// ============================================
self.addEventListener('sync', event => {
    if (event.tag === 'syncFiches') {
        console.log('[SW] Synchronisation des fiches en arrière-plan');
        event.waitUntil(syncFiches());
    }
});

async function syncFiches() {
    console.log('[SW] Synchronisation avec Firestore...');
    // La synchronisation est gérée par database.js
    // Ce hook permet de déclencher la sync quand la connexion revient
}

// ============================================
// PUSH NOTIFICATIONS (prêt pour le futur)
// ============================================
self.addEventListener('push', event => {
    const data = event.data ? event.data.json() : {};
    const title = data.title || 'FireDiag Auto';
    const options = {
        body: data.body || 'Nouvelle mise à jour disponible',
        icon: '/images/icon-192.png',
        badge: '/images/icon-192.png',
        vibrate: [200, 100, 200]
    };
    
    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

// ============================================
// GESTION DES MESSAGES
// ============================================
self.addEventListener('message', event => {
    if (event.data === 'skipWaiting') {
        self.skipWaiting();
    }
});

console.log('[SW] Service Worker FireDiag Auto chargé avec succès');
