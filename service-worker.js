self.addEventListener("install",e=>{
  e.waitUntil(
    caches.open("gqs").then(c=>c.addAll([
      "/",
      "/dashboard.html",
      "/semakkod.html"
    ]))
  );
});

self.addEventListener("fetch",e=>{
  e.respondWith(
    caches.match(e.request).then(r=>r||fetch(e.request))
  );
});
