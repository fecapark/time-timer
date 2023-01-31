import { RotatingLines } from "react-loader-spinner";
import Switch from "../../Switch/Switch";
import { LoaderWrapper, OptionSwitchContainer } from "./OptionSwitch.styled";
import { IOptionSwitchProps } from "./OptionSwitch.type";

export default function OptionSwitch({
  text,
  isActive,
  isLoading = false,
  onSwitchOn,
  onSwitchOff,
}: IOptionSwitchProps) {
  return (
    <OptionSwitchContainer isOn={isActive}>
      <span>{text}</span>
      {!isLoading ? (
        <Switch
          defaultState={isActive ? "on" : "off"}
          onOn={onSwitchOn}
          onOff={onSwitchOff}
        />
      ) : (
        <LoaderWrapper>
          <RotatingLines strokeColor="grey" width="20"></RotatingLines>
        </LoaderWrapper>
      )}
    </OptionSwitchContainer>
  );
}
