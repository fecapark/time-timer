import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  clockDegreeAtom,
  isClockPointerDownAtom,
  isTimingNowAtom,
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
  const isClockPointerDown = useRecoilValue(isClockPointerDownAtom);
  const [clockDegree, setClockDegree] = useRecoilState(clockDegreeAtom);
  const { min, sec } = getTimeFromDegree(clockDegree);

  const startTimer = () => {
    setIsTimingNow((prev) => !prev);

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
    if (!isClockPointerDown && clockDegree >= 360) {
      setIsTimingNow(false);
    }
  }, [clockDegree, isClockPointerDown]);

  return (
    <Container>
      <TimerButtonContainer onHide={!isTimingNow}>
        <button disabled={!isTimingNow} onClick={pauseTimer}>
          일시정지
        </button>
      </TimerButtonContainer>
      <TimerButtonContainer onHide={isClockPointerDown || isTimingNow}>
        <button disabled={clockDegree >= 360} onClick={startTimer}>
          시작하기
        </button>
      </TimerButtonContainer>
      <OptionSwitchContainer onHide={isClockPointerDown || isTimingNow}>
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
      <TimeText onZoom={isClockPointerDown || isTimingNow}>
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
