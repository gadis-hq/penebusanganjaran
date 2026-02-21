const CACHE_NAME="gadis-hq-cache-v1";
const urlsToCache=[
  "/index.html",
  "/semakkod.html",
  "/audience-screen.html",
  "/css/style.css",
  "/js/config.js",
  "/js/api.js",
  "/js/semakkod.js",
  "/js/dashboard.js",
  "/js/auth.js",
  "/data/malaysia.geojson"
];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))); });
self.addEventListener('fetch', e => { e.respondWith(caches.match(e.request).then(resp => resp || fetch(e.request))); });
