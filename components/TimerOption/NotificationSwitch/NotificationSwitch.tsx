import OptionSwitch from "../OptionSwitch/OptionSwitch";
import {
  isTimingNowAtom as ITN,
  isNotificationPermissionGrantedAtom as INPG,
  isNotificationSupportEnvironmentAtom as INSE,
  isSendPushOnAtom as ISPO,
  languageOptionValueAtom as LOV,
  clockDegreeAtom as CD,
} from "../../../shared/atom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import usePushNotification from "../../../hooks/usePushNotification";
import useModal from "../../../hooks/useModal";
import { SwitchSetState } from "../../Switch/Switch.type";
import { requestNotificationPermission } from "../../Timer/Timer.util";
import SupportingInfoModal from "../../Modal/contents/SupportingInfoModal/SupportingInfoModal";
import { useEffect } from "react";

export default function NotificationSwitch() {
  const language = useRecoilValue(LOV);
  const isTimingNow = useRecoilValue(ITN);
  const clockDegree = useRecoilValue(CD);
  const setIsNotificationSupportEnvironment = useSetRecoilState(INSE);
  const setIsNotificationPermissionGranted = useSetRecoilState(INPG);
  const [isSendPushOn, setIsSendPushOn] = useRecoilState(ISPO);
  const isEmptyClockDegree = clockDegree >= 360;

  const [requestPushToken, sendPushMessage] = usePushNotification({
    title: language === "kor" ? "설정한 시간이 종료되었어요." : "Time's up!",
    body: language === "kor" ? "다시 집중해볼까요?" : "Let's countdown again.",
  });
  const setModalActive = useModal({
    title:
      language === "kor"
        ? "푸쉬 알림을 지원하지 않는 브라우저입니다"
        : "Browser does not support push notification.",
    content: <SupportingInfoModal />,
  });

  const onSendPushOn = async (setSwitchState: SwitchSetState) => {
    const requestPermissionResult = await requestNotificationPermission()!;

    if (requestPermissionResult === "granted") {
      await requestPushToken();
      setIsSendPushOn(true);
      setIsNotificationPermissionGranted(true);
      return;
    }

    if (requestPermissionResult === "not-support") {
      setIsNotificationSupportEnvironment(false);
      setModalActive(true);
    }

    setSwitchState("off");
  };

  const onSendPushOff = () => {
    setIsSendPushOn(false);
  };

  const pushSendWrapper = () => {
    if (!isSendPushOn) return;
    sendPushMessage();
  };

  useEffect(() => {
    if (isTimingNow) return;
    if (!isEmptyClockDegree) return;
    pushSendWrapper();
  }, [isTimingNow, isEmptyClockDegree]);

  return (
    <OptionSwitch
      text={
        language === "kor"
          ? "종료시 푸쉬 알림 켜기"
          : "Activate push notification"
      }
      isActive={isSendPushOn}
      onSwitchOn={onSendPushOn}
      onSwitchOff={onSendPushOff}
    />
  );
}
