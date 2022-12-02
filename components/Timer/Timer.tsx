import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  clockDegreeAtom,
  isClockPointerDownAtom,
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
let audio: HTMLAudioElement | null = null;

export default function Timer() {
  const [isAlarmSoundOn, setIsAlarmSoundOn] = useState(false);
  const [isSendPushNotificationOn, setIsSendPushNotificationOn] =
    useState(false);
  const [isTimingNow, setIsTimingNow] = useRecoilState(isTimingNowAtom);
  const [clockDegree, setClockDegree] = useRecoilState(clockDegreeAtom);
  const isClockPointerDown = useRecoilValue(isClockPointerDownAtom);
  const isSoundEffectLoaded = useRecoilValue(soundEffectLoadedAtom);
  const soundEffectAudios = useRecoilValue(soundEffectAudiosAtom);

  const { min, sec } = getTimeFromDegree(clockDegree);
  const isEmptyClockDegree = clockDegree >= 360;

  if (!audio) {
    const sample = Object.values(soundEffectAudios)[0];
    if (sample) {
      audio = sample;
      audio.volume = 0;
    }
  }

  const startTimer = () => {
    setIsTimingNow((prev) => !prev);

    if (audio && isSoundEffectLoaded) {
      audio.volume = 1;
    }

    let prevTime = new Date().getTime();
    timerInterval = setInterval(() => {
      const curTime = new Date().getTime();
      const elapsed = (curTime - prevTime) / 1000;
      prevTime = curTime;

      setClockDegree((prevDegree) => {
        const nextDegree = prevDegree + elapsed / 10;
        if (nextDegree > 360) {
          if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
          }
          return 360;
        }
        return nextDegree;
      });
    }, 1000);
  };

  const pauseTimer = () => {
    if (!timerInterval) return;

    clearInterval(timerInterval);
    timerInterval = null;
    setIsTimingNow(false);
  };

  useEffect(() => {
    if (!isClockPointerDown && isEmptyClockDegree) {
      setIsTimingNow(false);
    }
  }, [clockDegree, isClockPointerDown]);

  useEffect(() => {
    if (
      !isTimingNow &&
      isEmptyClockDegree &&
      isSoundEffectLoaded &&
      isAlarmSoundOn
    ) {
      console.log(audio!.volume);
      audio!.play();
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
            onOn={() => {
              setIsSendPushNotificationOn(true);
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
