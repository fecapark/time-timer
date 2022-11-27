import { useEffect, useState } from "react";
import { Container, MovingBall } from "./Switch.style";
import { ISwitchProps } from "./Switch.type";
import { MdCheck } from "react-icons/md";

export default function Switch({ defaultState, onOn, onOff }: ISwitchProps) {
  const [switchState, setSwitchState] = useState(defaultState);

  const onClick = () => {
    setSwitchState((prev) => {
      if (prev === "on") return "off";
      return "on";
    });
  };

  useEffect(() => {
    if (switchState === "on") onOn();
    else onOff();
  }, [switchState]);

  return (
    <Container state={switchState} onClick={onClick}>
      <MovingBall state={switchState}>
        <MdCheck />
      </MovingBall>
    </Container>
  );
}
