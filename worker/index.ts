import { firebaseMessagingServiceWorker } from "./firebase-messaging-sw.js";

declare let self: ServiceWorkerGlobalScope;

const messaging = firebaseMessagingServiceWorker();
