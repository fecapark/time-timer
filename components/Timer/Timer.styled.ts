import styled from "@emotion/styled";

export const Container = styled.div`
  position: absolute;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 30px;

  right: 60px;
  bottom: 0px;
`;

export const TimeText = styled.div<{ triggerZoom: boolean }>`
  ${({ theme }) => theme.shareCSS.noDrag};

  font-size: 60px;
  line-height: 60px;
  font-weight: 100;

  display: flex;
  flex-direction: column;
  align-items: flex-end;

  transform-origin: right bottom;
  transform: scale(${(props) => (props.triggerZoom ? 2.5 : 1)});
  transition: transform
    ${(props) =>
      props.triggerZoom
        ? "0.3s cubic-bezier(0.2, 0, 0, 1)"
        : "0.15s cubic-bezier(0, 0, 0, 1)"};
  transition-delay: 0.3s;

  .row {
    width: 100px;
    display: flex;
    justify-content: flex-end;

    .min,
    .sec {
      font-family: "Poppins", sans-serif;
    }
  }
`;

export const TimerButtonContainer = styled.div<{ triggerHide: boolean }>`
  font-size: 14px;

  button {
    all: unset;

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
    transition: all
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

export const OptionSwitchContainer = styled.div<{ triggerHide: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;

  opacity: ${(props) => (props.triggerHide ? "0" : "1")};
  visibility: ${(props) => (props.triggerHide ? "hidden" : "visible")};
  transform: translate3d(
    0,
    ${(props) => (props.triggerHide ? "-20" : "0")}px,
    0
  );
  transition: ${(props) =>
    props.triggerHide
      ? "0.3s cubic-bezier(0.2, 0, 0, 1) 0.1s"
      : "0.2s cubic-bezier(0, 0, 0, 1) 0.5s"};
`;

export const OptionSwitchRow = styled.div<{ isOn: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    margin-right: 12px;
    color: ${(props) => (props.isOn ? "white" : "grey")};
  }
`;
