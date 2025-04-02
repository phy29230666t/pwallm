const CACHE_NAME = "pwa-cache-v1";
const URLS_TO_CACHE = ["/", "/index.html", "/index.js"];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(URLS_TO_CACHE))
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});

// 업데이트 체크
self.addEventListener("activate", (event) => {
    console.log("Service Worker activating...");
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== "pwa-cache-v1") {
                        console.log("Old cache deleted:", cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});
