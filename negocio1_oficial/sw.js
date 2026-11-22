const CACHE_NAME = "rincon-chamaca-v5";
const APP_SHELL = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./manifest.json",
    "./data/menu.json",
    "./imagenes/fin de semana/chairo.webp",
    "./imagenes/fin de semana/charquekan.webp",
    "./imagenes/fin de semana/chicharron.webp",
    "./imagenes/fin de semana/fricase.webp",
    "./imagenes/fin de semana/lechon.webp",
    "./imagenes/fin de semana/pollo al horno.webp",
    "./imagenes/fin de semana/sajta.webp",
    "./imagenes/jueves/s1.webp",
    "./imagenes/jueves/s2.webp",
    "./imagenes/jueves/s3.webp",
    "./imagenes/jueves/s4.webp",
    "./imagenes/logo.webp",
    "./imagenes/lunes/s1.webp",
    "./imagenes/lunes/s2.webp",
    "./imagenes/lunes/s3.webp",
    "./imagenes/lunes/sopa.webp",
    "./imagenes/martes/s1.webp",
    "./imagenes/martes/s2.webp",
    "./imagenes/martes/s3.webp",
    "./imagenes/martes/s4.webp",
    "./imagenes/miercoles/s1.webp",
    "./imagenes/miercoles/s2.webp",
    "./imagenes/miercoles/s3.webp",
    "./imagenes/miercoles/s4.webp",
    "./icons/icon-192.png",
    "./icons/icon-512.png",
    "./icons/icon-maskable-512.png"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(APP_SHELL))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys()
            .then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
            .then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", event => {
    const request = event.request;
    if (request.method !== "GET") return;
    const url = new URL(request.url);
    if (url.origin !== self.location.origin) return;

    if (request.mode === "navigate") {
        event.respondWith(
            fetch(request)
                .then(response => {
                    if (response && response.ok) {
                        const copy = response.clone();
                        caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
                    }
                    return response;
                })
                .catch(() => caches.match("./index.html"))
        );
        return;
    }

    event.respondWith(
        caches.match(request).then(cached => {
            if (cached) return cached;
            return fetch(request).then(response => {
                if (response && response.ok) {
                    const copy = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
                }
                return response;
            });
        })
    );
});
