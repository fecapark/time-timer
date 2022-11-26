import { useState } from "react";
import { useRecoilValue } from "recoil";
import { clockDegreeAtom, isClockPointerDownAtom } from "../../shared/atom";
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

  const isClockPointerDown = useRecoilValue(isClockPointerDownAtom);
  const clockDegree = useRecoilValue(clockDegreeAtom);
  const { min, sec } = getTimeFromDegree(clockDegree);

  return (
    <Container>
      <TimerButtonContainer onHide={isClockPointerDown}>
        <button>시작하기</button>
      </TimerButtonContainer>
      <OptionSwitchContainer onHide={isClockPointerDown}>
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
        {/* <OptionSwitchRow isOn={true}>
          <span>종료시 푸쉬 알림 켜기</span>
          <Switch defaultState="off" onOn={() => {}} onOff={() => {}} />
        </OptionSwitchRow> */}
      </OptionSwitchContainer>
      <TimeText onZoom={isClockPointerDown}>
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
