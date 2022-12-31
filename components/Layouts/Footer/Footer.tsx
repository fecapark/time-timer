import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import useBottomSheet from "../../../hooks/useBottomSheet";
import useMediaMatch from "../../../hooks/useMediaMatch";
import {
  clockDegreeAtom as CD,
  clockSizeAtom as CS,
  isClockPointerDownAtom as ICPD,
  isTimingNowAtom as ITN,
  languageOptionValueAtom as LOV,
  progressUnitValueAtom as PUV,
} from "../../../shared/atom";
import { Theme } from "../../../styles/theme";
import BottomSheetTimer from "../../BottomSheet/contents/BottomSheetTimer/BottomSheetTimer";
import RoundButton from "../../Button/RoundButton";
import {
  getPercentageFromDegree,
  getTimeFromDegree,
} from "../../Timer/Timer.util";
import { Container, PauseButton, TimeText } from "./Footer.style";
import { IoMdPause } from "react-icons/io";

export default function Footer() {
  const isClockPointerDown = useRecoilValue(ICPD);
  const [isTimingNow, setIsTimingNow] = useRecoilState(ITN);
  const clockSize = useRecoilValue(CS);
  const clockDegree = useRecoilValue(CD);
  const language = useRecoilValue(LOV);
  const progressUnit = useRecoilValue(PUV);
  const [timerFontSize, setTimerFontSize] = useState(55);
  const setBottomSheetActive = useBottomSheet({
    constructor: BottomSheetTimer,
  });
  const [isHideTimer, mediaSetted] = useMediaMatch(
    Theme.mediaQueries.hideTimerMaxWidth
  );

  const onTimerStartClick = () => {
    setBottomSheetActive(true);
  };

  const onTimerPauseClick = () => {
    setIsTimingNow(false);
  };

  useEffect(() => {
    const stageHeight = document.body.clientHeight;
    const usableHeight = (stageHeight - clockSize) / 2 - 35;

    setTimerFontSize(Math.min(Math.max(usableHeight, 55), 100));
  }, [clockSize]);

  return (
    <>
      <Container
        triggerHide={isClockPointerDown || isTimingNow}
        onHideTimer={isHideTimer}
      >
        {mediaSetted ? (
          isHideTimer ? (
            <RoundButton
              text={language === "kor" ? "집중 시작하기" : "Start Focus"}
              onClick={onTimerStartClick}
            />
          ) : (
            <span>
              Copyright &copy; 2022 Sanghyeok Park. All rights reserved.
            </span>
          )
        ) : null}
      </Container>
      {isHideTimer ? (
        <TimeText
          fontSize={timerFontSize}
          triggerHide={!isClockPointerDown && !isTimingNow}
        >
          {progressUnit === "time"
            ? getTimeFromDegree(clockDegree).sec
            : "." + getPercentageFromDegree(clockDegree).float}
        </TimeText>
      ) : null}
      {isHideTimer ? (
        <PauseButton triggerHide={!isTimingNow} onClick={onTimerPauseClick}>
          <IoMdPause />
        </PauseButton>
      ) : null}
    </>
  );
}
