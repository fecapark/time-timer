import styled from "@emotion/styled";
import { useState } from "react";

interface ISwitchProps {
  defaultState: "on" | "off";
  onOn: () => void;
  onOff: () => void;
}

interface IStyleProps {
  state: "on" | "off";
}

const Container = styled.div<IStyleProps>`
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
`;

const MovingBall = styled.div<IStyleProps>`
  width: 20px;
  height: 20px;
  border-radius: 50%;

  transition: 0.2s cubic-bezier(0.2, 0, 0, 1);
  transform: translate3d(
      ${(props) =>
        props.state === "on" ? "calc(50px - (3 * 4px) - 20px)" : "0"},
      0,
      0
    )
    scale(${(props) => (props.state === "on" ? "1" : "0.75")});
  background-color: ${(props) => (props.state === "on" ? "white" : "grey")};
`;

export default function Switch({ defaultState, onOn, onOff }: ISwitchProps) {
  const [switchState, setSwitchState] = useState(defaultState);
  const onClick = () => {
    setSwitchState((prev) => {
      if (prev === "on") {
        onOff();
        return "off";
      }

      onOn();
      return "on";
    });
  };

  return (
    <Container state={switchState} onClick={onClick}>
      <MovingBall state={switchState}></MovingBall>
    </Container>
  );
}
