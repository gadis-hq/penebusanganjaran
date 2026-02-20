const CACHE_NAME = "gadisqs-hq-v1";

const urlsToCache = [
  "/",
  "/index.html",
  "/semakkod.html",
  "/audience-screen.html",
  "/admin-login.html",
  "/dashboard.html",
  "/style.css",
  "/manifest.json",
  "/js/config.js",
  "/js/api.js",
  "/js/semakkod.js",
  "/js/dashboard.js",
  "/js/auth.js",
  "/icons/icon-192.png",
  "/icons/icon-512.png"
];

// Install
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Activate (clear old cache)
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});

// Fetch (offline support)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
