import { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import useModal from "../../hooks/useModal";
import usePushNotification from "../../hooks/usePushNotification";
import {
  isAlarmSoundOnAtom as IASO,
  isClockPointerDownAtom as ICPD,
  isNotificationPermissionGrantedAtom as INPG,
  isNotificationSupportEnvironmentAtom as INSE,
  isSendPushOnAtom as ISPO,
} from "../../shared/atom";
import Switch from "../Switch/Switch";
import { requestNotificationPermission } from "../Timer/Timer.util";
import {
  Container,
  LoaderWrapper,
  OptionSwitchRow,
} from "./AlarmOption.styled";
import SupportingInfoModal from "../Modal/contents/SupportingInfoModal/SupportingInfoModal";
import { IProps } from "./AlarmOption.type";
import { SetStateType } from "../../shared/types";
import { SwitchState } from "../Switch/Switch.type";

export default function AlarmOptionContainer({
  timer: { isTimingNow, isEmptyClockDegree },
  audio: { isAudioLoaded, playAudio },
}: IProps) {
  const [isAlarmSoundOn, setIsAlarmSoundOn] = useRecoilState(IASO);
  const [isSendPushOn, setIsSendPushOn] = useRecoilState(ISPO);
  const isClockPointerDown = useRecoilValue(ICPD);
  const setIsNotificationSupportEnvironment = useSetRecoilState(INSE);
  const setIsNotificationPermissionGranted = useSetRecoilState(INPG);
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
    if (isSendPushOn) sendPushMessage();
  };

  const onSoundAlarmOn = () => {
    setIsAlarmSoundOn(true);
  };

  const onSoundAlarmOff = () => {
    setIsAlarmSoundOn(false);
  };

  const onSendPushOn = async (setSwitchState: SetStateType<SwitchState>) => {
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
            onOn={onSoundAlarmOn}
            onOff={onSoundAlarmOff}
          />
        ) : (
          <LoaderWrapper>
            <RotatingLines strokeColor="grey" width="20"></RotatingLines>
          </LoaderWrapper>
        )}
      </OptionSwitchRow>
      <OptionSwitchRow isOn={isSendPushOn}>
        <span>종료시 푸쉬 알림 켜기</span>
        <Switch defaultState="off" onOn={onSendPushOn} onOff={onSendPushOff} />
      </OptionSwitchRow>
    </Container>
  );
}
