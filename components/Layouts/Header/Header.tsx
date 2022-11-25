import { useRecoilValue } from "recoil";
import { isClockPointerDownAtom } from "../../../shared/atom";
import { Container } from "./Header.style";

export default function Header() {
  const isClockPointerDown = useRecoilValue(isClockPointerDownAtom);

  return (
    <Container triggerHide={isClockPointerDown}>
      <div className="logo">
        <div className="left word">Time</div>
        <div className="right word">Timer</div>
      </div>
    </Container>
  );
}
