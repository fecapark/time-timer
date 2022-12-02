import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  clockDegreeAtom,
  isClockPointerDownAtom,
  isNotificationPermissionGranted,
  isNotificationSupportEnvironmentAtom,
  isTimingNowAtom,
  soundEffectAudiosAtom,
  soundEffectLoadedAtom,
} from "../../shared/atom";
import Switch from "../Switch/Switch";
import {
  Container,
  OptionSwitchContainer,
  OptionSwitchRow,
  TimerButtonContainer,
  TimeText,
} from "./Timer.styled";
import { getTimeFromDegree } from "./Timer.util";

let timerInterval: NodeJS.Timer | null = null;

export default function Timer() {
  const [isAlarmSoundOn, setIsAlarmSoundOn] = useState(false);
  const [isSendPushNotificationOn, setIsSendPushNotificationOn] =
    useState(false);
  const [isTimingNow, setIsTimingNow] = useRecoilState(isTimingNowAtom);
  const [clockDegree, setClockDegree] = useRecoilState(clockDegreeAtom);
  const isClockPointerDown = useRecoilValue(isClockPointerDownAtom);
  const isSoundEffectLoaded = useRecoilValue(soundEffectLoadedAtom);
  const soundEffectAudios = useRecoilValue(soundEffectAudiosAtom);
  const setIsNotificationSupportEnvironment = useSetRecoilState(
    isNotificationSupportEnvironmentAtom
  );
  const setIsNotificationPermissionGranted = useSetRecoilState(
    isNotificationPermissionGranted
  );

  const { min, sec } = getTimeFromDegree(clockDegree);
  const isEmptyClockDegree = clockDegree >= 360;

  const sampleAudio = Object.values(soundEffectAudios)[0];
  if (sampleAudio) sampleAudio.volume = 0;

  const startTimer = () => {
    const getNextDegree = (prevDegree: number, elapsedTime: number) => {
      const result = prevDegree + elapsedTime / 10;
      const degreeOvered = result > 360;

      if (degreeOvered && timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
      }

      return Math.min(360, result);
    };

    const onInterval = () => {
      const curTime = new Date().getTime();
      const elapsed = (curTime - prevTime) / 1000;
      setClockDegree((prevDegree) => getNextDegree(prevDegree, elapsed));
      prevTime = curTime;
    };

    setIsTimingNow((prev) => !prev);

    if (isSoundEffectLoaded) {
      console.log("pause but volume 1");
      sampleAudio.pause();
      sampleAudio.currentTime = 0;
      sampleAudio.volume = 1;
    }

    let prevTime = new Date().getTime();
    timerInterval = setInterval(onInterval, 1000);
  };

  const pauseTimer = () => {
    if (!timerInterval) return;

    clearInterval(timerInterval);
    timerInterval = null;
    setIsTimingNow(false);
  };

  const requestNotificationPermission = () => {
    const isClientSupportNotification = () => {
      return (
        "Notification" in window &&
        "serviceWorker" in navigator &&
        "PushManager" in window
      );
    };

    const request = async () => {
      const permission = await Notification.requestPermission();
      setIsNotificationPermissionGranted(permission === "granted");
      return permission === "granted";
    };

    if (!isClientSupportNotification()) {
      setIsNotificationSupportEnvironment(false);
      return;
    }

    return request();
  };

  useEffect(() => {
    const isTimingEnd = !isClockPointerDown && isEmptyClockDegree;
    if (!isTimingEnd) return;

    setIsTimingNow(false);
  }, [clockDegree, isClockPointerDown]);

  useEffect(() => {
    const canPlayAudio = isSoundEffectLoaded && isAlarmSoundOn;

    if (!isTimingNow && canPlayAudio) {
      sampleAudio.volume = 1;
      sampleAudio.currentTime = 0;
      sampleAudio.play();
    }
  }, [isTimingNow]);

  return (
    <Container>
      <TimerButtonContainer triggerHide={!isTimingNow}>
        <button disabled={!isTimingNow} onClick={pauseTimer}>
          일시정지
        </button>
      </TimerButtonContainer>
      <TimerButtonContainer triggerHide={isClockPointerDown || isTimingNow}>
        <button disabled={isEmptyClockDegree} onClick={startTimer}>
          {isEmptyClockDegree ? "시간을 설정해주세요" : "집중 시작하기"}
        </button>
      </TimerButtonContainer>
      <OptionSwitchContainer triggerHide={isClockPointerDown || isTimingNow}>
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
              const isPermissionGranted =
                await requestNotificationPermission()!;

              if (!isPermissionGranted) {
                setSwitchState("off");
              } else {
                setIsSendPushNotificationOn(true);
              }
            }}
            onOff={() => {
              setIsSendPushNotificationOn(false);
            }}
          />
        </OptionSwitchRow>
      </OptionSwitchContainer>
      <TimeText triggerZoom={isClockPointerDown || isTimingNow}>
        <div className="row">
          <span className="min">{min}</span>
        </div>
        <div className="row">
          <span className="sec">{sec}</span>
        </div>
      </TimeText>
    </Container>
  );
}
