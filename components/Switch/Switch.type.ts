type State = "on" | "off";

export interface ISwitchProps {
  defaultState: State;
  onOn: () => void;
  onOff: () => void;
}

export interface IStyleProps {
  state: State;
}
