import firebase from "firebase";

export async function getMessagingToken() {
  const messaging = firebase.messaging();
  const token = await messaging.getToken({
    vapidKey: process.env.NEXT_PUBLIC_FB_MESSAGING_KEY,
  });
  return token;
}
