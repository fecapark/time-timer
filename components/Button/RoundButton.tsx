import styled from "@emotion/styled";
import { MouseEventHandler } from "react";

interface IRoundButtonProps {
  text: string;
  triggerHide?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

const Container = styled.div<{ triggerHide: boolean }>`
  button {
    all: unset;

    font-size: 14px;

    ${({ theme }) => theme.shareCSS.noDrag};

    border: 2px solid white;
    padding: 0.8em 1.6em;
    border-radius: 1000px;

    opacity: ${(props) => (props.triggerHide ? "0" : "1")};
    visibility: ${(props) => (props.triggerHide ? "hidden" : "visible")};
    transform: translate3d(
      0,
      ${(props) => (props.triggerHide ? "-40" : "0")}px,
      0
    );
    transition: opacity
        ${(props) =>
          props.triggerHide
            ? "0.3s cubic-bezier(0.2, 0, 0, 1) 0.1s"
            : "0.2s cubic-bezier(0, 0, 0, 1) 0.5s"},
      transform
        ${(props) =>
          props.triggerHide
            ? "0.3s cubic-bezier(0.2, 0, 0, 1) 0.1s"
            : "0.2s cubic-bezier(0, 0, 0, 1) 0.5s"},
      border
        ${(props) =>
          props.triggerHide
            ? "0.3s cubic-bezier(0.2, 0, 0, 1)"
            : "0.2s cubic-bezier(0, 0, 0, 1)"},
      background
        ${(props) =>
          props.triggerHide
            ? "0.3s cubic-bezier(0.2, 0, 0, 1)"
            : "0.2s cubic-bezier(0, 0, 0, 1)"};

    cursor: pointer;

    &:disabled {
      cursor: default;

      border-color: grey;
      color: grey;
    }

    &:not(:disabled):hover {
      border-color: ${({ theme }) => theme.background.hoverAccent};
      background-color: ${({ theme }) => theme.background.hoverAccent};
    }
  }
`;

export default function RoundButton({
  text,
  onClick = () => {},
  disabled = false,
  triggerHide = false,
}: IRoundButtonProps) {
  return (
    <Container triggerHide={triggerHide}>
      <button disabled={disabled} onClick={onClick}>
        {text}
      </button>
    </Container>
  );
}
