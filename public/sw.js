// Zerena service worker — offline-first calmado.
const VERSION = "serena-v3";
const SHELL_CACHE = `${VERSION}-shell`;
const RUNTIME_CACHE = `${VERSION}-runtime`;

const SHELL = ["/", "/manifest.webmanifest", "/icon-192.png", "/icon-512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(SHELL_CACHE)
      .then((cache) => cache.addAll(SHELL))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(
        names
          .filter((n) => n !== SHELL_CACHE && n !== RUNTIME_CACHE && n.startsWith("serena-"))
          .map((n) => caches.delete(n)),
      );
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Fuentes de Google (cross-origin): CacheFirst para que el diseño se sostenga offline.
  if (url.origin === "https://fonts.googleapis.com" || url.origin === "https://fonts.gstatic.com") {
    event.respondWith(
      (async () => {
        const cached = await caches.match(req);
        if (cached) return cached;
        try {
          const fresh = await fetch(req);
          const cache = await caches.open(RUNTIME_CACHE);
          cache.put(req, fresh.clone());
          return fresh;
        } catch {
          return cached || Response.error();
        }
      })(),
    );
    return;
  }

  // Audio guiado (incluye el origen público de Storage): CacheFirst para
  // reutilizarlo offline después de la primera escucha.
  if (/\.(mp3|m4a|wav|ogg)$/i.test(url.pathname)) {
    event.respondWith(
      (async () => {
        const cached = await caches.match(req);
        if (cached) return cached;
        try {
          const fresh = await fetch(req);
          if (fresh.ok || fresh.type === "opaque") {
            const cache = await caches.open(RUNTIME_CACHE);
            await cache.put(req, fresh.clone());
          }
          return fresh;
        } catch {
          return cached || Response.error();
        }
      })(),
    );
    return;
  }

  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/~oauth")) return;

  // Navegaciones: NetworkFirst con fallback a shell.
  if (req.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(req);
          const cache = await caches.open(RUNTIME_CACHE);
          cache.put(req, fresh.clone());
          return fresh;
        } catch {
          const cached = await caches.match(req);
          return cached || (await caches.match("/")) || Response.error();
        }
      })(),
    );
    return;
  }

  // Assets hasheados: CacheFirst.
  if (/\.(js|css|woff2?|ttf|otf|png|jpg|jpeg|svg|webp|ico)$/i.test(url.pathname)) {
    event.respondWith(
      (async () => {
        const cached = await caches.match(req);
        if (cached) return cached;
        try {
          const fresh = await fetch(req);
          const cache = await caches.open(RUNTIME_CACHE);
          cache.put(req, fresh.clone());
          return fresh;
        } catch {
          return cached || Response.error();
        }
      })(),
    );
  }
});
