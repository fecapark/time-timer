import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

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

export const Container = styled.div`
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

  opacity: 0;
  transform: translate3d(0, 30px, 0);
  animation: ${TimerFadeKeyframe} 0.4s cubic-bezier(0.2, 0, 0, 1) 0.5s forwards;

  @media screen and (max-width: ${({ theme }) =>
      theme.responsiveSizes.hideTimer}px) {
    justify-content: center;
    flex-direction: row-reverse;

    position: static;
    right: auto;
    bottom: auto;
  }
`;
