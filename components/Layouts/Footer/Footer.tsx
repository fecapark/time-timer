import styled from "@emotion/styled";
import { useRecoilValue } from "recoil";
import { isClockPointerDownAtom } from "../../../shared/atom";

const Container = styled.footer<{ triggerHide: boolean }>`
  font-size: 12px;
  color: #a0a0a0;
  width: 100%;

  padding: 3em 0;

  transform: translate3d(
    0,
    ${(props) => (props.triggerHide ? "100%" : "0")},
    0
  );
  transition: transform
    ${(props) =>
      props.triggerHide
        ? "0.5s cubic-bezier(0.2, 0, 0, 1)"
        : "0.3s cubic-bezier(0, 0, 0, 1)"};
  transition-delay: 0.4s;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Footer() {
  const isClockPointerDown = useRecoilValue(isClockPointerDownAtom);

  return (
    <Container triggerHide={isClockPointerDown}>
      <span>Copyright &copy; 2022 Sanghyeok Park. All rights reserved.</span>
    </Container>
  );
}
