import styled from "@emotion/styled";

export const Container = styled.button<{ triggerHide: boolean }>`
  ${({ theme }) => theme.shareCSS.noDrag};

  font-family: ${({ theme }) => theme.font.family.openSans};
  color: white;
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
          ? "0.3s cubic-bezier(0.2, 0, 0, 1)"
          : "0.2s cubic-bezier(0, 0, 0, 1) 0.4s"},
    visibility
      ${(props) =>
        props.triggerHide
          ? "0.3s cubic-bezier(0.2, 0, 0, 1)"
          : "0.2s cubic-bezier(0, 0, 0, 1) 0.4s"},
    transform
      ${(props) =>
        props.triggerHide
          ? "0.3s cubic-bezier(0.2, 0, 0, 1)"
          : "0.2s cubic-bezier(0, 0, 0, 1) 0.4s"},
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
`;
