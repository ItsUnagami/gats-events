// GATS Events service worker: makes the app installable and lets it open offline.
// Bump VERSION whenever you change the app files so phones pick up the update.
const VERSION = "gats-v1";
const SHELL = [
  "/", "/index.html", "/styles.css", "/app.js", "/config.js", "/manifest.webmanifest",
  "/icons/icon-192.png", "/icons/icon-512.png", "/icons/apple-touch-icon.png", "/icons/favicon-64.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Network first for the app's own files (so updates show up), cache as fallback.
// Database and sign-in requests go to Supabase and are never cached here.
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  const isLib = url.hostname === "cdn.jsdelivr.net" || url.hostname.endsWith("googleapis.com") || url.hostname.endsWith("gstatic.com");
  if (!sameOrigin && !isLib) return;

  e.respondWith(
    fetch(req)
      .then((res) => {
        if (res.ok && (sameOrigin || isLib)) {
          const copy = res.clone();
          caches.open(VERSION).then((c) => c.put(req, copy));
        }
        return res;
      })
      .catch(() =>
        caches.match(req).then((hit) => hit || (req.mode === "navigate" ? caches.match("/index.html") : Response.error()))
      )
  );
});
