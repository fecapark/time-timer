import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import usePushNotification from "../../hooks/usePushNotification";
import {
  isClockPointerDownAtom,
  isNotificationPermissionGrantedAtom,
  isNotificationSupportEnvironmentAtom,
} from "../../shared/atom";
import Switch from "../Switch/Switch";
import { requestNotificationPermission } from "../Timer/Timer.util";
import { Container, OptionSwitchRow } from "./AlarmOption.styled";

interface IProps {
  timer: {
    isTimingNow: boolean;
    isEmptyClockDegree: boolean;
  };
  audio: {
    playAudio: () => void;
  };
}

export default function AlarmOptionContainer({
  timer: { isTimingNow, isEmptyClockDegree },
  audio: { playAudio },
}: IProps) {
  const [isAlarmSoundOn, setIsAlarmSoundOn] = useState(false);
  const [isSendPushNotificationOn, setIsSendPushNotificationOn] =
    useState(false);

  const isClockPointerDown = useRecoilValue(isClockPointerDownAtom);
  const setIsNotificationSupportEnvironment = useSetRecoilState(
    isNotificationSupportEnvironmentAtom
  );
  const setIsNotificationPermissionGranted = useSetRecoilState(
    isNotificationPermissionGrantedAtom
  );
  const [requestPushToken, sendPushMessage] = usePushNotification({
    title: "설정한 시간이 종료되었어요.",
    body: "다시 집중해볼까요?",
  });

  const executeAlarmByOptions = () => {
    if (isAlarmSoundOn) playAudio();
    if (isSendPushNotificationOn) sendPushMessage();
  };

  useEffect(() => {
    if (isTimingNow) return;
    if (!isEmptyClockDegree) return;
    executeAlarmByOptions();
  }, [isTimingNow, isEmptyClockDegree]);

  return (
    <Container triggerHide={isClockPointerDown || isTimingNow}>
      <OptionSwitchRow isOn={isAlarmSoundOn}>
        <span>종료시 알람 소리 켜기</span>
        <Switch
          defaultState="off"
          onOn={() => {
            setIsAlarmSoundOn(true);
          }}
          onOff={() => {
            setIsAlarmSoundOn(false);
          }}
        />
      </OptionSwitchRow>
      <OptionSwitchRow isOn={isSendPushNotificationOn}>
        <span>종료시 푸쉬 알림 켜기</span>
        <Switch
          defaultState="off"
          onOn={async (setSwitchState) => {
            const requestPermissionResult =
              await requestNotificationPermission()!;

            if (requestPermissionResult === "granted") {
              setIsSendPushNotificationOn(true);
              setIsNotificationPermissionGranted(true);
              await requestPushToken();
            } else if (requestPermissionResult === "denied") {
              setSwitchState("off");
            } else {
              setIsNotificationSupportEnvironment(false);
              setSwitchState("off");
            }
          }}
          onOff={() => {
            setIsSendPushNotificationOn(false);
          }}
        />
      </OptionSwitchRow>
    </Container>
  );
}
