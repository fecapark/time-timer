import { Dispatch, SetStateAction } from "react";

export type SwitchState = "on" | "off";

export interface ISwitchProps {
  defaultState: SwitchState;
  onOn: (setState: Dispatch<SetStateAction<SwitchState>>) => void;
  onOff: (setState: Dispatch<SetStateAction<SwitchState>>) => void;
}

export interface IStyleProps {
  state: SwitchState;
}
