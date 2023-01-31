import { Dispatch, SetStateAction } from "react";

export type SwitchState = "on" | "off";
export type SwitchSetState = Dispatch<SetStateAction<SwitchState>>;

export interface ISwitchProps {
  defaultState: SwitchState;
  onOn: (setState: SwitchSetState) => void;
  onOff: (setState: SwitchSetState) => void;
}

export interface IStyleProps {
  state: SwitchState;
}
