import { useRecoilValue } from "recoil";
import {
  clockDegreeAtom,
  clockSizeAtom,
  isClockPointerDownAtom,
  isTimingNowAtom,
} from "../../../shared/atom";
import { Container, TimeText } from "./Header.style";
import useMediaMatch from "../../../hooks/useMediaMatch";
import { Theme } from "../../../styles/theme";
import { useEffect, useState } from "react";
import { getTimeFromDegree } from "../../Timer/Timer.util";

export default function Header() {
  const isClockPointerDown = useRecoilValue(isClockPointerDownAtom);
  const isTimingNow = useRecoilValue(isTimingNowAtom);
  const isHideTimer = useMediaMatch(
    `screen and (max-width: ${Theme.responsiveSizes.hideTimer}px)`
  );
  const clockDegree = useRecoilValue(clockDegreeAtom);
  const clockSize = useRecoilValue(clockSizeAtom);

  const [timerFontSize, setTimerFontSize] = useState(55);

  useEffect(() => {
    const stageHeight = document.body.clientHeight;
    const usableHeight = (stageHeight - clockSize) / 2 - 35;

    setTimerFontSize(Math.min(Math.max(usableHeight, 55), 100));
  }, [clockSize]);

  return (
    <>
      <Container triggerHide={isClockPointerDown || isTimingNow}>
        <div className="logo">
          <div className="left word">Time</div>
          <div className="right word">Timer</div>
        </div>
      </Container>
      {isHideTimer ? (
        <TimeText fontSize={timerFontSize} triggerHide={!isClockPointerDown}>
          {getTimeFromDegree(clockDegree).min}
        </TimeText>
      ) : null}
    </>
  );
}
