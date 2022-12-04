import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  clockDegreeAtom,
  isClockPointerDownAtom,
  isNotificationPermissionGranted,
  isNotificationSupportEnvironmentAtom,
  isTimingNowAtom,
  soundEffectAudioAtom,
} from "../../shared/atom";
import { audioSrc } from "../../shared/const";
import Switch from "../Switch/Switch";
import {
  Container,
  OptionSwitchContainer,
  OptionSwitchRow,
  TimerButtonContainer,
  TimeText,
} from "./Timer.styled";
import { getTimeFromDegree, requestNotificationPermission } from "./Timer.util";

let timerInterval: NodeJS.Timer | null = null;
let audio: HTMLAudioElement | null = null;
let realAudioSrc: string | null = null;

export default function Timer() {
  const [isAlarmSoundOn, setIsAlarmSoundOn] = useState(false);
  const [isSendPushNotificationOn, setIsSendPushNotificationOn] =
    useState(false);
  const [isTimingNow, setIsTimingNow] = useRecoilState(isTimingNowAtom);
  const [clockDegree, setClockDegree] = useRecoilState(clockDegreeAtom);
  const isClockPointerDown = useRecoilValue(isClockPointerDownAtom);
  const soundEffectAudio = useRecoilValue(soundEffectAudioAtom);
  const setIsNotificationSupportEnvironment = useSetRecoilState(
    isNotificationSupportEnvironmentAtom
  );
  const setIsNotificationPermissionGranted = useSetRecoilState(
    isNotificationPermissionGranted
  );
  const isEmptyClockDegree = clockDegree >= 360;

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

    if (audio && audio.src === "") {
      audio.src = audioSrc.dummyAudioSrc;
      audio.play();

      audio.onended = () => {
        audio!.src = realAudioSrc!;
        audio!.onended = null;
      };
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

  useEffect(() => {
    if (audio) return;
    if (!soundEffectAudio) return;
    audio = soundEffectAudio.audio;
    realAudioSrc = soundEffectAudio.src;
  }, [soundEffectAudio]);

  useEffect(() => {
    const isTimingEnd = !isClockPointerDown && isEmptyClockDegree;
    const canPlayAudio = audio && isAlarmSoundOn;

    if (!isTimingEnd) return;
    if (isEmptyClockDegree && canPlayAudio) {
      audio!.play();
    }

    setIsTimingNow(false);
  }, [clockDegree, isClockPointerDown]);

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
              const requestPermissionResult =
                await requestNotificationPermission()!;

              if (requestPermissionResult === "granted") {
                setIsNotificationPermissionGranted(true);
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
      </OptionSwitchContainer>
      <TimeText triggerZoom={isClockPointerDown || isTimingNow}>
        <div className="row">
          <span className="min">{getTimeFromDegree(clockDegree).min}</span>
        </div>
        <div className="row">
          <span className="sec">{getTimeFromDegree(clockDegree).sec}</span>
        </div>
      </TimeText>
    </Container>
  );
}
