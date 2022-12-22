import { Container } from "./RoundButton.styled";
import { IProps } from "./RoundButton.type";

export default function RoundButton({
  text,
  onClick = () => {},
  disabled = false,
  triggerHide = false,
}: IProps) {
  return (
    <Container triggerHide={triggerHide} disabled={disabled} onClick={onClick}>
      {text}
    </Container>
  );
}
