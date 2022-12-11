import { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useRecoilValue, useSetRecoilState } from "recoil";
import useModal from "../../hooks/useModal";
import usePushNotification from "../../hooks/usePushNotification";
import {
  isClockPointerDownAtom,
  isNotificationPermissionGrantedAtom,
  isNotificationSupportEnvironmentAtom,
  isModalActiveAtom,
} from "../../shared/atom";
import Switch from "../Switch/Switch";
import { requestNotificationPermission } from "../Timer/Timer.util";
import {
  Container,
  LoaderWrapper,
  OptionSwitchRow,
} from "./AlarmOption.styled";
import SupportingInfoModal from "./SupportingInfoModal/SupportingInfoModal";

interface IProps {
  timer: {
    isTimingNow: boolean;
    isEmptyClockDegree: boolean;
  };
  audio: {
    isAudioLoaded: boolean;
    playAudio: () => void;
  };
}

export default function AlarmOptionContainer({
  timer: { isTimingNow, isEmptyClockDegree },
  audio: { isAudioLoaded, playAudio },
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
  const setModalActive = useModal({
    title: "푸쉬 알림을 지원하지 않는 브라우저입니다",
    content: <SupportingInfoModal />,
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
        {isAudioLoaded ? (
          <Switch
            defaultState="off"
            onOn={() => {
              setIsAlarmSoundOn(true);
            }}
            onOff={() => {
              setIsAlarmSoundOn(false);
            }}
          />
        ) : (
          <LoaderWrapper>
            <RotatingLines strokeColor="grey" width="20"></RotatingLines>
          </LoaderWrapper>
        )}
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
              setModalActive(true);
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
