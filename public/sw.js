// sw.js
const CACHE_NAME = "site-cache-v1";

// ✅ List of URLs to pre-cache (critical assets)
const PRECACHE_URLS = [
  "/clark-mayer/", // index.html
  "/clark-mayer/index.html",
  "/clark-mayer/fun.html",
  "/clark-mayer/certification-guides.html",
  "/clark-mayer/clarke-moyer-cissp-certification-passing-guide.html",
  "/clark-mayer/clarke-moyer-world-famous-apple-crisp-recipe.html",
  "/clark-mayer/cooking.html",
  "/clark-mayer/assets/main-C78rqZWu.css",
  "/clark-mayer/assets/main-brUPaDIQ.js",
  "/clark-mayer/js/cad2bcff-6be8-4603-9534-a947d09392e1.js",
  "/clark-mayer/js/ae6e123c-a334-4202-a051-2cad20282cd0.js",
  "/clark-mayer/js/b2d9b980-09b0-4536-a17f-64c2d1a25ac1.js",
  "/clark-mayer/js/cce84b2c-519a-43c9-9c9a-71dd7b81ba68.js",
  "/clark-mayer/assets/proud-wgu-grad-DpJpLFs9.webp",
  "/clark-mayer/assets/Family-Photo-BrixEtuc.webp",
  "/clark-mayer/assets/Clarke-Moyer-Bio-Picture-D6BbUIGy.webp",
  "/clark-mayer/assets/Clarke-Moyer-CM-Logo-zjSwj3ec.jpg",
  "/clark-mayer/assets/Clarke-Moyer-CM-Logo-BPg2opd6.webp",
  "/clark-mayer/assets/an-abstract-picture-of-a-difficult-technical-certification-exam-Dvzz0Nw8.webp",
  "/clark-mayer/assets/FFC-circle-DccwFsDy.webp",
  "/clark-mayer/assets/WGU-MarketingLogo-Dh7T82Yo.webp",
];

// ✅ During install: pre-cache core assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[ServiceWorker] Pre-caching essential files");
      return cache.addAll(PRECACHE_URLS);
    })
  );
  self.skipWaiting();
});

// ✅ During activate: remove old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("[ServiceWorker] Removing old cache:", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// ✅ Fetch event: network-first for HTML, cache-first for others
self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Handle only same-origin requests
  if (url.origin !== location.origin) return;

  // 🧠 Strategy: Network-first for HTML pages
  if (request.destination === "document" || request.url.endsWith(".html")) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const cloned = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, cloned));
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // 🧠 Strategy: Cache-first for CSS, JS, images
  if (["style", "script", "image"].includes(request.destination)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          const cloned = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, cloned));
          return response;
        });
      })
    );
  }
});
