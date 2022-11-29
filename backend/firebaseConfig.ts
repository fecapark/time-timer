import firebase from "firebase";

const firebaseConfig = {
  storageBucket: process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET,
};

export const fbApp = firebase.initializeApp(firebaseConfig);
export const fbStorage = firebase.storage();
