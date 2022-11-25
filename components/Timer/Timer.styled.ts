import styled from "@emotion/styled";

export const Container = styled.div`
  position: absolute;

  right: 60px;
  bottom: 0px;

  display: flex;
  align-items: flex-end;
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

export const TimerButtonContainer = styled.div`
  font-size: 14px;

  button {
    all: unset;

    border: 1px solid white;
    padding: 0.8em 1.6em;
    border-radius: 1000px;

    cursor: pointer;
    transform: translate3d(0, -10px, 0);
  }
`;
