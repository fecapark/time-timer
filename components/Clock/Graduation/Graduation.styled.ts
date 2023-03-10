import styled from "@emotion/styled";
import { IGraduationStyleProps } from "./Graduation.type";
import { getRotatedPosition } from "../Clock.util";

export const GraduationContainer = styled.div<IGraduationStyleProps>`
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

  & > span {
    font-weight: 500;
    font-size: 22px;
    color: ${(props) => (props.spanAccent ? "white" : "#525252")};

    position: absolute;
    left: 50%;
    bottom: 100%;
    transform-origin: center center;
    transform: translate3d(-50%, ${(props) => -props.gap}px, 0)
      rotate3d(0, 0, 1, ${(props) => props.rotate}deg)
      scale(${(props) => (props.spanAccent ? "1" : "0.85")});

    transition: color 0.2s cubic-bezier(0.2, 0, 0, 1),
      transform 0.2s cubic-bezier(0.2, 0, 0, 1);

    @media screen and (max-width: 600px) {
      font-size: 26px;
    }

    .min {
      color: ${(props) => (props.spanAccent ? "#e0e0e0" : "#424242")};
      margin-left: 0.2em;
      font-size: 0.6em;
    }
  }
`;
