import { useRecoilValue } from "recoil";
import useMediaMatch from "../../../hooks/useMediaMatch";
import { isClockPointerDownAtom, isTimingNowAtom } from "../../../shared/atom";
import { Theme } from "../../../styles/theme";
import { Container } from "./Footer.style";

export default function Footer() {
  const isClockPointerDown = useRecoilValue(isClockPointerDownAtom);
  const isTimingNow = useRecoilValue(isTimingNowAtom);
  const isHideTimer = useMediaMatch(
    `screen and (max-width: ${Theme.responsiveSizes.hideTimer}px)`
  );

  return (
    <Container triggerHide={isClockPointerDown || isTimingNow}>
      {isHideTimer ? (
        <></>
      ) : (
        <span>
          Copyright &copy; 2022 <u>Sanghyeok Park</u>. All rights reserved.
        </span>
      )}
    </Container>
  );
}
