import { useRecoilValue } from "recoil";
import { isClockPointerDownAtom, isTimingNowAtom } from "../../../shared/atom";
import { Container } from "./Footer.style";

export default function Footer() {
  const isClockPointerDown = useRecoilValue(isClockPointerDownAtom);
  const isTimingNow = useRecoilValue(isTimingNowAtom);

  return (
    <Container triggerHide={isClockPointerDown || isTimingNow}>
      <span>Copyright &copy; 2022 Sanghyeok Park. All rights reserved.</span>
    </Container>
  );
}
