const CACHE_NAME = 'v1_cache_102';

let urlsToCache = [
    './', './css/styles.css', './css/jquery.js', './design/active-states.jpg', './design/desktop-design.jpg', './design/desktop-preview.jpg', './design/mobile-design.jpg', './images/', './main.js', './manifest.json', './sw.js'
];

self.addEventListener('install', e => (
    e.waitUntil(
        caches.open(CACHE_NAME).then( cache => (
            cache.addAll(urlsToCache).then( () => {
                self.skipWaiting();
            })
        )).catch( err => {
            console.log(err)
        })
    )
))

self.addEventListener('activate', e => {
    const cacheWhiteList = [CACHE_NAME]
    e.waitUntil(
        caches.keys().then( cacheNames => {
            return Promise.all(
                cacheNames.map( cacheName => {
                    if( cacheWhiteList.indexOf(cacheName) === -1 ){
                        return caches.delelte(cacheName);
                    }
                })
            )
        }).then( () => {
            self.clients.claim();
        })
    )
})

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then( res => {
            if(res){
                return res;
            }
            return fetch(e.request);
        })
    )
})