const CACHE_NAME="gadis-hq-cache-v1";
const urlsToCache=[
  "/",
  "/index.html",
  "/audience-screen.html",
  "/semakkod.html",
  "/css/style.css",
  "/js/config.js",
  "/js/dashboard.js",
  "/js/semakkod.js",
  "/js/confetti.js",
  "/icons/icon-192.png",
  "/icons/icon-512.png"
];

self.addEventListener("install",event=>{event.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(urlsToCache)))});
self.addEventListener("activate",event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>{if(k!==CACHE_NAME)return caches.delete(k);}))))});
self.addEventListener("fetch",event=>{event.respondWith(caches.match(event.request).then(r=>r||fetch(event.request)))});
