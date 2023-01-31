import firebase from "firebase/app";
import "firebase/messaging";

type RequestNotificationPermissionResult = "granted" | "denied" | "not-support";

export const getTimeFromDegree = (degree: number, maxClockTime: number) => {
  const parseTimeFactor = (maxClockTime * 60) / 360;
  const totalSec = Math.round((360 - degree) * parseTimeFactor);

  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;

  return {
    min: min < 10 ? `0${min}` : `${min}`,
    sec: sec < 10 ? `0${sec}` : `${sec}`,
  };
};

export const getPercentageFromDegree = (degree: number) => {
  const fullPercentage = Math.round(((360 - degree) / 360) * 10000) / 100;
  const [integer, float] = fullPercentage.toString().split(".");
  return {
    int: integer.length === 1 ? `0${integer}` : integer,
    float:
      !float || float.length === 0
        ? "00"
        : float.length === 1
        ? `${float}0`
        : float,
  };
};

export const requestNotificationPermission =
  (): Promise<RequestNotificationPermissionResult> => {
    const isClientSupportNotification = () => {
      const messagingSupport = firebase.messaging.isSupported();

      return (
        messagingSupport &&
        "Notification" in window &&
        "serviceWorker" in navigator &&
        "PushManager" in window
      );
    };

    const request = async () => {
      if (!isClientSupportNotification()) return "not-support";

      const permission = await Notification.requestPermission();
      return permission === "granted" ? "granted" : "denied";
    };

    return request();
  };
