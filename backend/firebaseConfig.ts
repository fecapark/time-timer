import { credential } from "firebase-admin";
import { initializeApp as initialAdminApp } from "firebase-admin/app";
import firebase from "firebase/app";
import "firebase/storage";

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FB_API_KEY,
  projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FB_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FB_APP_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

initialAdminApp({
  credential: credential.cert(
    JSON.parse(process.env.NEXT_PUBLIC_FB_ADMIN_SDK_JSON)
  ),
});

export const fbStorage = firebase.storage();
