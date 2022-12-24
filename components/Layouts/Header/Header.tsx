import { useRecoilValue } from "recoil";
import {
  clockDegreeAtom as CD,
  clockSizeAtom as CS,
  isClockPointerDownAtom as ICPD,
  isTimingNowAtom as ITN,
} from "../../../shared/atom";
import { Container, TimeText } from "./Header.style";
import useMediaMatch from "../../../hooks/useMediaMatch";
import { Theme } from "../../../styles/theme";
import { useEffect, useState } from "react";
import { getTimeFromDegree } from "../../Timer/Timer.util";

export default function Header() {
  const isClockPointerDown = useRecoilValue(ICPD);
  const isTimingNow = useRecoilValue(ITN);
  const clockDegree = useRecoilValue(CD);
  const clockSize = useRecoilValue(CS);
  const [timerFontSize, setTimerFontSize] = useState(55);
  const [isHideTimer, _] = useMediaMatch(Theme.mediaQueries.hideTimerMaxWidth);

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
        <TimeText
          fontSize={timerFontSize}
          triggerHide={!isClockPointerDown && !isTimingNow}
        >
          {getTimeFromDegree(clockDegree).min}
        </TimeText>
      ) : null}
    </>
  );
}
