import { useState } from "react";
import { Container, MovingBall } from "./Switch.style";
import { ISwitchProps } from "./Switch.type";
import { MdCheck } from "react-icons/md";
import useIsomorphicEffect from "../../hooks/useIsomorphicEffect";

export default function Switch({ defaultState, onOn, onOff }: ISwitchProps) {
  const [switchState, setSwitchState] = useState(defaultState);

  const onClick = () => {
    setSwitchState((prev) => {
      if (prev === "on") return "off";
      return "on";
    });
  };

  useIsomorphicEffect(() => {
    if (switchState === "on") onOn(setSwitchState);
    else onOff(setSwitchState);
  }, [switchState]);

  return (
    <Container state={switchState} onClick={onClick}>
      <MovingBall state={switchState}>
        <MdCheck />
      </MovingBall>
    </Container>
  );
}
