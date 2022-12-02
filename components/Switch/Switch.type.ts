import { Dispatch, SetStateAction } from "react";

type State = "on" | "off";

export interface ISwitchProps {
  defaultState: State;
  onOn: (setState: Dispatch<SetStateAction<State>>) => void;
  onOff: (setState: Dispatch<SetStateAction<State>>) => void;
}

export interface IStyleProps {
  state: State;
}
