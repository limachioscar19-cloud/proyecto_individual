const CACHE = 'decohogar-v3';
const CORE = ['./', './index.html', './style.css', './script.js', './productos.json', './manifest.json'];
self.addEventListener('install', e => {
    e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)));
    self.skipWaiting()
});
self.addEventListener('activate', e => {
    e.waitUntil(caches.keys().then(a => Promise.all(a.filter(x => x !== CACHE).map(x => caches.delete(x)))));
    self.clients.claim()
});
self.addEventListener('fetch', e => {
    let r = e.request,
        u = new URL(r.url);
    if (r.method !== 'GET' || u.origin !== self.location.origin) return;
    if (r.mode === 'navigate') {
        e.respondWith(fetch(r).then(x => {
            let c = x.clone();
            caches.open(CACHE).then(k => k.put('./index.html', c));
            return x
        }).catch(() => caches.match('./index.html')));
        return
    }
    e.respondWith(caches.match(r).then(x => x || fetch(r).then(y => {
        if (y.ok) {
            let z = y.clone();
            caches.open(CACHE).then(k => k.put(r, z))
        }
        return y
    }).catch(() => caches.match('./index.html'))))
});
const CORE = ['./', './index.html', './style.css', './script.js', './productos.json', './manifest.json'];
self.addEventListener('install', e => {
    e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)));
    self.skipWaiting()
});
self.addEventListener('activate', e => {
    e.waitUntil(caches.keys().then(a => Promise.all(a.filter(x => x !== CACHE).map(x => caches.delete(x)))));
    self.clients.claim()
});
self.addEventListener('fetch', e => {
    let r = e.request,
        u = new URL(r.url);
    if (r.method !== 'GET' || u.origin !== self.location.origin) return;
    if (r.mode === 'navigate') {
        e.respondWith(fetch(r).then(x => {
            let c = x.clone();
            caches.open(CACHE).then(k => k.put('./index.html', c));
            return x
        }).catch(() => caches.match('./index.html')));
        return
    }
    e.respondWith(caches.match(r).then(x => x || fetch(r).then(y => {
        if (y.ok) {
            let z = y.clone();
            caches.open(CACHE).then(k => k.put(r, z))
        }
        return y
    }).catch(() => caches.match('./index.html'))))
});