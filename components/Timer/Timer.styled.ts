import styled from "@emotion/styled";
import { css, keyframes } from "@emotion/react";
import { Theme } from "../../styles/theme";

const TimerFadeKeyframe = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 30px, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

export const TimerFadeAnimationCSS = css`
  animation: ${TimerFadeKeyframe} 0.4s cubic-bezier(0.2, 0, 0, 1) 0.5s forwards;
`;

export const Container = styled.div<{ disableAnimation: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 30px;

  position: absolute;
  right: 60px;
  bottom: 0px;

  .option-container {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 30px;
  }

  opacity: ${(props) => (props.disableAnimation ? "1" : "0")};
  transform: translate3d(
    0,
    ${(props) => (props.disableAnimation ? "0" : "30px")},
    0
  );

  @media screen and (max-width: ${Theme.responsiveSizes.hideTimer}px) {
    justify-content: center;
    flex-direction: row-reverse;

    position: static;
    right: auto;
    bottom: auto;
  }
`;
