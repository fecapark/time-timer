import { firebaseMessagingServiceWorker } from "./firebase-messaging-sw.js";

declare let self: ServiceWorkerGlobalScope;

const messaging = firebaseMessagingServiceWorker();
const CACHE_NAME = "time-timer-cache";
const FILES_TO_CACHE = ["/"];

// When service worker installed, do caching!
self.addEventListener("install", (e) => {
  e?.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener("fetch", (e) => {
  if (e?.request.method !== "GET") return;

  const fetchRequest = e.request.clone();

  e.respondWith(
    fetch(fetchRequest)
      .then((res) => {
        caches
          .open(CACHE_NAME)
          .then((cache) => cache.put(e.request.url, res.clone()));
        return res;
      })
      .catch(() => {
        return caches.match(e.request.url).then((cache) => {
          return cache!;
        });
      })
  );
});
