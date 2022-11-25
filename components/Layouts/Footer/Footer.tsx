import { useRecoilValue } from "recoil";
import { isClockPointerDownAtom } from "../../../shared/atom";
import { Container } from "./Footer.style";

export default function Footer() {
  const isClockPointerDown = useRecoilValue(isClockPointerDownAtom);

  return (
    <Container triggerHide={isClockPointerDown}>
      <span>Copyright &copy; 2022 Sanghyeok Park. All rights reserved.</span>
    </Container>
  );
}
