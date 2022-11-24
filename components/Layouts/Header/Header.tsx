import styled from "@emotion/styled";
import { useRecoilValue } from "recoil";
import { isClockPointerDownAtom } from "../../../shared/atom";

const Container = styled.header<{ triggerHide: boolean }>`
  font-size: 18px;
  padding: 2em 0;

  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  .logo {
    display: flex;
    gap: 2px;

    font-family: "Raleway", sans-serif;
    font-weight: 600;
    letter-spacing: 0.3px;

    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -webkit-user-drag: none;

    cursor: default;

    .word {
      padding: 3px 6px;
      line-height: 1em;

      &.right {
        background-color: white;
        color: #212121;
      }
    }
  }
`;

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
