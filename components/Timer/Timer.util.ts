type RequestNotificationPermissionResult = "granted" | "denied" | "not-support";

export const getTimeFromDegree = (degree: number) => {
  const totalSec = Math.round((360 - degree) * 10);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;

  return {
    min: min < 10 ? `0${min}` : `${min}`,
    sec: sec < 10 ? `0${sec}` : `${sec}`,
  };
};

export const requestNotificationPermission =
  (): Promise<RequestNotificationPermissionResult> => {
    const isClientSupportNotification = () => {
      return (
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
