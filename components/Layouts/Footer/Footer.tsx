import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import useBottomSheet from "../../../hooks/useBottomSheet";
import useMediaMatch from "../../../hooks/useMediaMatch";
import {
  clockDegreeAtom as CD,
  clockSizeAtom as CS,
  isClockPointerDownAtom as ICPD,
  isTimingNowAtom as ITN,
} from "../../../shared/atom";
import { Theme } from "../../../styles/theme";
import BottomSheetTimer from "../../BottomSheet/contents/BottomSheetTimer/BottomSheetTimer";
import RoundButton from "../../Button/RoundButton";
import { getTimeFromDegree } from "../../Timer/Timer.util";
import { Container, TimeText } from "./Footer.style";

export default function Footer() {
  const isClockPointerDown = useRecoilValue(ICPD);
  const isTimingNow = useRecoilValue(ITN);
  const clockSize = useRecoilValue(CS);
  const clockDegree = useRecoilValue(CD);
  const [timerFontSize, setTimerFontSize] = useState(55);
  const setBottomSheetActive = useBottomSheet({
    content: <BottomSheetTimer />,
  });
  const isHideTimer = useMediaMatch(
    `screen and (max-width: ${Theme.responsiveSizes.hideTimer}px)`
  );

  const onClick = () => {
    setBottomSheetActive(true);
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
        {isHideTimer ? (
          <RoundButton text="집중 시작하기" onClick={onClick} />
        ) : (
          <span>
            Copyright &copy; 2022 <u>Sanghyeok Park</u>. All rights reserved.
          </span>
        )}
      </Container>
      {isHideTimer ? (
        <TimeText fontSize={timerFontSize} triggerHide={!isClockPointerDown}>
          {getTimeFromDegree(clockDegree).sec}
        </TimeText>
      ) : null}
    </>
  );
}
