import { SwitchSetState } from "../../Switch/Switch.type";

export interface IOptionSwitchProps {
  text: string;
  isActive: boolean;
  isLoading?: boolean;
  onSwitchOn: (setState: SwitchSetState) => void;
  onSwitchOff: (setState: SwitchSetState) => void;
}
