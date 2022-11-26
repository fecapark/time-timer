import { useState } from "react";
import { Container, MovingBall } from "./Switch.style";
import { ISwitchProps } from "./Switch.type";

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
