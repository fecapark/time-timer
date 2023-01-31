import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  clockDegreeAtom as CD,
  isClockPointerDownAtom as ICPD,
  isTimingNowAtom as ITN,
  soundEffectAudioAtom as SEA,
  languageOptionValueAtom as LOV,
  progressUnitValueAtom as PUV,
  maxClockTimeAtom as MCT,
} from "../../shared/atom";
import { Container, TimeText } from "./Timer.styled";
import { getPercentageFromDegree, getTimeFromDegree } from "./Timer.util";
import "firebase/messaging";
import RoundButton from "../Button/RoundButton/RoundButton";
import useMediaMatch from "../../hooks/useMediaMatch";
import { Theme } from "../../styles/theme";
import { IProps } from "./Timer.type";
import useRecordManager from "../../hooks/useRecordManager";
import TimerOption from "../TimerOption/TimerOption";

let timerInterval: NodeJS.Timer | null = null;
let startTime: Date | null = null;
let startDegree: number = 0;
let isPausedBefore: boolean = false;

export default function Timer({ onTimingStart }: IProps) {
  const [isTimingNow, setIsTimingNow] = useRecoilState(ITN);
  const [clockDegree, setClockDegree] = useRecoilState(CD);
  const isClockPointerDown = useRecoilValue(ICPD);
  const language = useRecoilValue(LOV);
  const progressUnit = useRecoilValue(PUV);
  const maxClockTime = useRecoilValue(MCT);
  const [isHideTimer, _] = useMediaMatch(Theme.mediaQueries.hideTimerMaxWidth);
  const { manageBehavior, manageTimeRecords } = useRecordManager();
  const isEmptyClockDegree = clockDegree >= 360;

  const removeTimerInterval = () => {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = null;
  };

  const startTimer = () => {
    const getNextDegree = (prevDegree: number, elapsedTime: number) => {
      const timeParseFactor = maxClockTime / 6;
      const result = prevDegree + elapsedTime / timeParseFactor;
      return Math.min(360, result);
    };

    const onInterval = () => {
      const curTime = new Date().getTime();
      const elapsed = (curTime - prevTime) / 1000;
      setClockDegree((prevDegree) => getNextDegree(prevDegree, elapsed));
      prevTime = curTime;
    };

    if (timerInterval) removeTimerInterval();

    let prevTime = new Date().getTime();
    startTime = new Date();
    startDegree = clockDegree;
    timerInterval = setInterval(onInterval, 1000);
  };

  const pauseTimer = () => {
    isPausedBefore = true;
    setIsTimingNow(false);
  };

  const getCompleteRatio = () => {
    return 1 - (360 - clockDegree) / (360 - startDegree);
  };

  useEffect(() => {
    const isTimingEnd = !isClockPointerDown && isEmptyClockDegree;
    if (!isTimingEnd) return;

    isPausedBefore = false;
    setIsTimingNow(false);
  }, [clockDegree, isClockPointerDown]);

  useEffect(() => {
    if (isTimingNow) return;
    if (!timerInterval) return;
    if (startTime === null) return;

    removeTimerInterval();

    const endTime = new Date();
    const timingDuration = endTime.getTime() - startTime.getTime();

    if (timingDuration < 10 * 60 * 1000) return; // 10 min
    manageBehavior({ isPausedBefore, endTime, timingDuration });
    manageTimeRecords({
      isPausedBefore,
      startTime: startTime!,
      endTime,
      completeRatio: getCompleteRatio(),
      timingDuration,
    });
  }, [isTimingNow]);

  return (
    <Container>
      <div className="option-container">
        {isHideTimer ? null : (
          <RoundButton
            text={language === "kor" ? "일시정지" : "Pause"}
            disabled={!isTimingNow}
            onClick={pauseTimer}
            triggerHide={!isTimingNow}
          />
        )}
        <RoundButton
          text={
            isEmptyClockDegree
              ? language === "kor"
                ? "시간을 설정해주세요"
                : "Please Set Time"
              : language === "kor"
              ? "집중 시작하기"
              : "Start Focus"
          }
          disabled={isEmptyClockDegree}
          onClick={() => {
            setIsTimingNow(true);
            startTimer();
            if (onTimingStart) onTimingStart();
          }}
          triggerHide={isClockPointerDown || isTimingNow}
        />
        <TimerOption />
      </div>
      <TimeText
        triggerZoom={isClockPointerDown || isTimingNow}
        isHide={isHideTimer}
      >
        <div className="row">
          <span className="min">
            {progressUnit === "time"
              ? getTimeFromDegree(clockDegree, maxClockTime).min
              : getPercentageFromDegree(clockDegree).int}
          </span>
        </div>
        <div className="row">
          <span className="sec">
            {progressUnit === "time"
              ? getTimeFromDegree(clockDegree, maxClockTime).sec
              : "." + getPercentageFromDegree(clockDegree).float}
          </span>
        </div>
      </TimeText>
    </Container>
  );
}
