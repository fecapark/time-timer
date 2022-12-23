import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  clockDegreeAtom as CD,
  isClockPointerDownAtom as ICPD,
  isTimingNowAtom as ITN,
  soundEffectAudioAtom as SEA,
} from "../../shared/atom";
import { Container, TimeText } from "./Timer.styled";
import { getTimeFromDegree } from "./Timer.util";
import "firebase/messaging";
import useAudio from "../../hooks/useAudio";
import AlarmOptionContainer from "../AlarmOption/AlarmOptionContainer";
import RoundButton from "../Button/RoundButton";
import useMediaMatch from "../../hooks/useMediaMatch";
import { Theme } from "../../styles/theme";

let timerInterval: NodeJS.Timer | null = null;

export default function Timer() {
  const [isTimingNow, setIsTimingNow] = useRecoilState(ITN);
  const [clockDegree, setClockDegree] = useRecoilState(CD);
  const isClockPointerDown = useRecoilValue(ICPD);
  const soundEffectAudio = useRecoilValue(SEA);
  const [getAudioPermission, playAudio] = useAudio(soundEffectAudio?.src);
  const isHideTimer = useMediaMatch(
    `screen and (max-width: ${Theme.responsiveSizes.hideTimer}px)`
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
    const isTimingEnd = !isClockPointerDown && isEmptyClockDegree;
    if (!isTimingEnd) return;

    setIsTimingNow(false);
  }, [clockDegree, isClockPointerDown]);

  return (
    <Container isHide={isHideTimer}>
      <div className="option-container">
        {isHideTimer ? null : (
          <RoundButton
            text="일시정지"
            disabled={!isTimingNow}
            onClick={pauseTimer}
            triggerHide={!isTimingNow}
          />
        )}
        <RoundButton
          text={isEmptyClockDegree ? "시간을 설정해주세요" : "집중 시작하기"}
          disabled={isEmptyClockDegree}
          onClick={() => {
            getAudioPermission();
            setIsTimingNow(true);
            startTimer();
          }}
          triggerHide={isClockPointerDown || isTimingNow}
        />
        <AlarmOptionContainer
          timer={{ isEmptyClockDegree, isTimingNow }}
          audio={{ isAudioLoaded: soundEffectAudio !== null, playAudio }}
        />
      </div>
      <TimeText
        triggerZoom={isClockPointerDown || isTimingNow}
        isHide={isHideTimer}
      >
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
