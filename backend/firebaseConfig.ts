import { initializeApp, FirebaseOptions } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig: FirebaseOptions = {
  storageBucket: process.env.NEXT_PUBLIC_FB_STORAGE_URL,
};

export const fbApp = initializeApp(firebaseConfig);
export const fbStorage = getStorage(fbApp);
