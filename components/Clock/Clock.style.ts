import styled from "@emotion/styled";
import { IGraduationStyleProps } from "./Clock.type";
import { getRotatedPosition } from "./Clock.util";

export const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
`;

export const MainClock = styled.div`
  width: 600px;
  height: 600px;

  display: flex;
  justify-content: center;
  align-items: center;
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

export const Graduation = styled.div<IGraduationStyleProps>`
  width: ${(props) => (props.accent ? 3 : 2)}px;
  height: ${(props) => (props.accent ? 20 : 14)}px;

  position: absolute;
  transform-origin: center center;
  transform: translate3d(
      ${(props) => {
        const { x, y } = getRotatedPosition(200, props.rotate);
        return `calc(-50% + ${x}px), calc(-50% + ${y}px), 0`;
      }}
    )
    rotate3d(0, 0, 1, ${(props) => -props.rotate}deg);
  background-color: ${(props) => (props.accent ? "white" : "grey")};

  span {
    font-size: 16px;
    font-weight: 500;

    position: absolute;
    left: 50%;
    bottom: 100%;
    transform-origin: center center;
    transform: translate3d(-50%, ${(props) => -props.gap}px, 0)
      rotate3d(0, 0, 1, ${(props) => props.rotate}deg);
  }
`;
