import { useRecoilValue } from "recoil";
import { isClockPointerDownAtom, isTimingNowAtom } from "../../../shared/atom";
import { Container } from "./Header.style";

export default function Header() {
  const isClockPointerDown = useRecoilValue(isClockPointerDownAtom);
  const isTimingNow = useRecoilValue(isTimingNowAtom);

  return (
    <Container triggerHide={isClockPointerDown || isTimingNow}>
      <div className="logo">
        <div className="left word">Time</div>
        <div className="right word">Timer</div>
      </div>
    </Container>
  );
}
