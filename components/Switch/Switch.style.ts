import styled from "@emotion/styled";
import { IStyleProps } from "./Switch.type";

export const Container = styled.div<IStyleProps>`
  width: 50px;
  border-radius: 1000px;
  padding: 4px;

  transition: 0.2s cubic-bezier(0.2, 0, 0, 1);
  border: 2px solid ${(props) => (props.state === "on" ? "white" : "grey")};

  user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -moz-user-select: none;

  cursor: pointer;

  &:hover {
    border-color: ${(props) => (props.state === "on" ? "white" : "#b0b0b0")};

    div {
      background-color: ${(props) =>
        props.state === "on" ? "white" : "#b0b0b0"};
      transform: translate3d(
          ${(props) =>
            props.state === "on" ? "calc(50px - (3 * 4px) - 20px)" : "4px"},
          0,
          0
        )
        scale(${(props) => (props.state === "on" ? "1" : "0.9")});
    }
  }
`;

export const MovingBall = styled.div<IStyleProps>`
  width: 20px;
  height: 20px;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: 0.2s cubic-bezier(0.2, 0, 0, 1);
  transform: translate3d(
      ${(props) =>
        props.state === "on" ? "calc(50px - (3 * 4px) - 20px)" : "0"},
      0,
      0
    )
    scale(${(props) => (props.state === "on" ? "1" : "0.75")});
  background-color: ${(props) => (props.state === "on" ? "white" : "grey")};

  svg {
    visibility: ${(props) => (props.state === "on" ? "visible" : "hidden")};
    color: #212121;
  }
`;
