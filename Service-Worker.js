const CACHE_NAME = 'cineapp-v1';

const urlsToCache = [

    '/',

    '/index.html',

    '/style.css',

    '/script.js',

    '/manifest.json',

    '/offline.html'
];


// INSTALAÇÃO

self.addEventListener('install', event => {

    console.log('Service Worker instalado');

    event.waitUntil(

        caches.open(CACHE_NAME)
        .then(cache => {

            return cache.addAll(urlsToCache);
        })
    );
});


// FETCH

self.addEventListener('fetch', event => {

    event.respondWith(

        caches.match(event.request)

        .then(response => {

            return response || fetch(event.request);
        })

        .catch(() => {

            return caches.match('/offline.html');
        })
    );
});


// ATIVAÇÃO

self.addEventListener('activate', event => {

    console.log('Service Worker ativado');

    event.waitUntil(

        caches.keys().then(cacheNames => {

            return Promise.all(

                cacheNames.map(cache => {

                    if (cache !== CACHE_NAME) {

                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});
