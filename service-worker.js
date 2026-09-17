 const CACHE_NAME = "rainbow-school-v1";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./manifest.json",

    "./images/school-logo.jpg",
    "./images/building.jpeg",
    "./images/school-building.png",
    "./images/principal-photo.jpg",

    "./images/gallery-football.jpg",
    "./images/gallery-christmas.jpg",
    "./images/gallery-learning.jpg",
    "./images/gallery-school-life.jpg",
    "./images/gallery-skating.jpg"
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                return cache.addAll(FILES_TO_CACHE);
            })
    );

    self.skipWaiting();
});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );

    self.clients.claim();
});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (cachedResponse) {
                return cachedResponse || fetch(event.request);
            })
    );
});