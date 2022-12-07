import { useCallback, useState } from "react";
import { useRecoilValue } from "recoil";
import firebase from "firebase/app";
import "firebase/messaging";
import {
  isNotificationPermissionGrantedAtom,
  isNotificationSupportEnvironmentAtom,
} from "../shared/atom";

interface INotificationContent {
  title: string;
  body: string;
}

const API_ENDPOINT = "https://fcm.googleapis.com/fcm/send";

export default function usePushNotification({
  title,
  body,
}: INotificationContent): [() => Promise<void>, () => void] {
  const [token, setToken] = useState("");
  const isNotificationSupportEnvironment = useRecoilValue(
    isNotificationSupportEnvironmentAtom
  );
  const isNotificationPermissionGranted = useRecoilValue(
    isNotificationPermissionGrantedAtom
  );

  const requestToken = async () => {
    const messaging = firebase.messaging();

    const token = await messaging.getToken({
      vapidKey: process.env.NEXT_PUBLIC_FB_MESSAGING_KEY,
    });

    setToken(token);
  };

  const sendPushMessage = useCallback(() => {
    if (token === "") return;
    if (!isNotificationPermissionGranted) return;
    if (!isNotificationSupportEnvironment) return;

    fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          process.env.NEXT_PUBLIC_FB_MESSAGING_REST_AUTH_HEADER ?? "",
      },
      body: JSON.stringify({
        to: token,
        notification: { title, body },
      }),
    });
  }, [
    token,
    isNotificationPermissionGranted,
    isNotificationSupportEnvironment,
  ]);

  return [requestToken, sendPushMessage];
}
