const CACHE_NAME = "rincon-chamaca-final-v1";
const APP_SHELL = [
    "./",
    "./index.html",
    "./style.css",
    "./manifest.json",
    "./data/menu.json",
    "./icons/icon-192.png",
    "./icons/icon-512.png",
    "./icons/icon-maskable-512.png",
    "./imagenes/logo.png",
    "./js/data/loader.js",
    "./js/main.js",
    "./js/modules/cart-ui.js",
    "./js/modules/cart.js",
    "./js/modules/checkout.js",
    "./js/modules/menu.js",
    "./js/modules/navigation.js",
    "./js/modules/orders.js",
    "./js/modules/pwa.js",
    "./js/modules/theme.js",
    "./js/modules/timer.js",
    "./js/modules/toast.js",
    "./js/utils/dom.js",
    "./js/utils/format.js",
    "./js/utils/security.js",
    "./js/vendor/jquery.min.js",
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache =>
            cache.addAll(APP_SHELL)
        ).then(() => self.skipWaiting())
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            )
        ).then(() => self.clients.claim())
    );
});

function networkFirst(request) {
    return fetch(request)
        .then(response => {
            if (response && response.status === 200) {
                const copy = response.clone();
                caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
            }
            return response;
        })
        .catch(() => caches.match(request));
}

self.addEventListener("fetch", event => {
    const request = event.request;

    if (request.method !== "GET") return;

    const url = new URL(request.url);

    if (url.origin !== self.location.origin) return;

    if (request.mode === "navigate") {
        event.respondWith(
            fetch(request)
                .then(response => {
                    const copy = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
                    return response;
                })
                .catch(() => caches.match("./index.html"))
        );
        return;
    }

    if (url.pathname.endsWith("/menu.json")) {
        event.respondWith(networkFirst(request));
        return;
    }

    event.respondWith(
        caches.match(request).then(cached => {
            if (cached) return cached;

            return fetch(request).then(response => {
                if (response && response.status === 200) {
                    const copy = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
                }
                return response;
            });
        })
    );
});
