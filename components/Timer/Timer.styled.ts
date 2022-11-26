import styled from "@emotion/styled";

export const Container = styled.div`
  position: absolute;

  right: 60px;
  bottom: 0px;
`;

export const TimeText = styled.div<{ onZoom: boolean }>`
  font-size: 60px;
  line-height: 60px;
  font-weight: 100;

  display: flex;
  flex-direction: column;
  align-items: flex-end;

  transform-origin: right bottom;
  transform: scale(${(props) => (props.onZoom ? 2.5 : 1)});
  transition: transform
    ${(props) =>
      props.onZoom
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

export const TimerButtonContainer = styled.div<{ onHide: boolean }>`
  font-size: 14px;
  margin-bottom: 30px;

  button {
    all: unset;

    border: 2px solid white;
    padding: 0.8em 1.6em;
    border-radius: 1000px;

    opacity: ${(props) => (props.onHide ? "0" : "1")};
    visibility: ${(props) => (props.onHide ? "hidden" : "visible")};
    transform: translate3d(0, ${(props) => (props.onHide ? "-40" : "0")}px, 0);
    transition: ${(props) =>
      props.onHide
        ? "0.3s cubic-bezier(0.2, 0, 0, 1) 0.1s"
        : "0.2s cubic-bezier(0, 0, 0, 1) 0.5s"};

    cursor: pointer;
  }
`;
