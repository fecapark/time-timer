import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const ClockFadeKeyframe = keyframes`
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
  ${({ theme }) => theme.shareCSS.noDrag};

  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  transform-origin: center center;
`;

export const MainClock = styled.div`
  width: 600px;
  height: 600px;

  display: flex;
  justify-content: center;
  align-items: center;

  touch-action: none;
  cursor: grab;

  opacity: 0;
  transform: translate3d(0, 30px, 0);
  animation: ${ClockFadeKeyframe} 0.4s cubic-bezier(0.2, 0, 0, 1) 0.4s forwards;
`;

export const ClockCenter = styled.div`
  position: relative;
`;

export const ClockBackground = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);

  width: 400px;
  height: 400px;

  border-radius: 50%;
  background-color: #0000001e;
`;

export const ClockHandler = styled.div`
  width: 60px;
  height: 60px;

  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: center center;
  transform: translate3d(-50%, -50%, 0);

  border-radius: 50%;
  background-color: white;

  .pointer {
    width: 6px;
    height: 20px;
    background-color: inherit;

    border-top-left-radius: 2px;
    border-top-right-radius: 2px;

    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translate3d(-50%, 10%, 0);
  }
`;
