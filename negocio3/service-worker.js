const CACHE = 'limatex-v2';
const CORE = [
  './',
  './index.html',
  './styles.css',
  './script.js',
  './manifest.json',
  './imagenes/logo.png',
  './imagenes/icon-192.png',
  './imagenes/icon-512.png',
  './imagenes/banda_textil.jpg',
  './imagenes/cinta_decorativa.jpg',
  './imagenes/cinta_elastica.jpg',
  './imagenes/cinta_textil.jpg',
  './imagenes/cordon_textil.jpg',
  './imagenes/cuerda_trenzada.webp',
  './imagenes/fabricacion_personalizada.jpg',
  './imagenes/guato_carpeta.jpg',
  './imagenes/hilos_algodon.jpg',
  './imagenes/hilo_industrial.webp',
  './imagenes/hilo_sintetico.jpg',
  './imagenes/ribete_tejido.webp',
  './imagenes/sesgo_textil.jpg',
  './imagenes/tejido_algodon.jpg',
  './imagenes/tejido_sintetico.jpg',
  './imagenes/tela_industrial.jpg',
  './imagenes/tira_confeccion.jpg',
  './imagenes/venda.webp',
  './imagenes/venda_elastica.webp',
  './imagenes/venda_gasa.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(CORE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request)
        .then(response => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE).then(cache => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => caches.match('./index.html'));
    })
  );
});
