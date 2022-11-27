import { useState } from "react";
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

export default function Timer() {
  const [isAlarmSoundOn, setIsAlarmSoundOn] = useState(false);
  const [isSendPushNotificationOn, setIsSendPushNotificationOn] =
    useState(false);
  const [isTimingNow, setIsTimingNow] = useRecoilState(isTimingNowAtom);
  const isClockPointerDown = useRecoilValue(isClockPointerDownAtom);
  const [clockDegree, setClockDegree] = useRecoilState(clockDegreeAtom);
  const { min, sec } = getTimeFromDegree(clockDegree);

  return (
    <Container>
      <TimerButtonContainer onHide={isClockPointerDown || isTimingNow}>
        <button
          onClick={() => {
            setIsTimingNow((prev) => !prev);
          }}
        >
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
        <OptionSwitchRow isOn={isSendPushNotificationOn || isTimingNow}>
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
