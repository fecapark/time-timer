import styled from "@emotion/styled";

export const PauseButton = styled.button<{ triggerHide: boolean }>`
  all: unset;

  font-size: 18px;

  position: fixed;
  right: 5vw;
  bottom: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.background.secondary};
  padding: 1.3em 1em;

  border-top-left-radius: 1000px;
  border-top-right-radius: 1000px;

  transform: translate3d(
    0,
    ${(props) => (props.triggerHide ? "100%" : "0")},
    0
  );
  transition: transform
      ${(props) =>
        props.triggerHide
          ? "0.2s cubic-bezier(0, 0, 0, 1)"
          : "0.3s cubic-bezier(0.2, 0, 0, 1) 1s"},
    background
      ${(props) =>
        props.triggerHide
          ? "0.3s cubic-bezier(0.2, 0, 0, 1)"
          : "0.2s cubic-bezier(0, 0, 0, 1)"};

  &:hover {
    background-color: ${({ theme }) => theme.background.hoverAccent};
  }

  svg {
    font-size: 1em;
    color: #e0e0e0;
  }
`;

export const TimeText = styled.div<{
  triggerHide: boolean;
  fontSize: number;
}>`
  font-size: ${(props) => props.fontSize}px;
  font-weight: 100;
  line-height: 1em;
  font-family: ${({ theme }) => theme.font.family.poppins};

  position: fixed;
  left: 50%;
  bottom: calc(-60px - ${(props) => props.fontSize}px);

  transform: translate3d(
    -50%,
    ${(props) =>
      props.triggerHide ? "0" : (-60 - props.fontSize - 35).toString()}px,
    0
  );

  transition: transform
    ${(props) =>
      props.triggerHide
        ? "0.5s cubic-bezier(0.2, 0, 0, 1) 0.35s"
        : "0.3s cubic-bezier(0, 0, 0, 1) 0.6s"};
`;

export const Container = styled.footer<{
  triggerHide: boolean;
  onHideTimer: boolean;
}>`
  font-size: 12px;
  color: #a0a0a0;
  width: 100%;
  height: 60px;

  transform: translate3d(
    0,
    ${(props) => {
      if (!props.triggerHide) return "0";
      const res = (props.onHideTimer ? 51 : 12) + props.theme.font.bodySize * 3;
      return res.toString() + "px";
    }},
    0
  );
  transition: transform
    ${(props) =>
      props.triggerHide
        ? "0.5s cubic-bezier(0.2, 0, 0, 1) 0.4s"
        : "0.3s cubic-bezier(0, 0, 0, 1) 0.4s"};

  display: flex;
  flex-direction: column;
  gap: 0.3em;
  justify-content: flex-end;
  align-items: center;

  u {
    cursor: pointer;

    &:hover {
      color: white;
    }
  }

  @media screen and (max-width: ${({ theme }) =>
      theme.responsiveSizes.hideTimer}px) {
    font-size: 15px;
    transition: transform
      ${(props) =>
        props.triggerHide
          ? "0.5s cubic-bezier(0.2, 0, 0, 1) 0.1s"
          : "0.3s cubic-bezier(0, 0, 0, 1) 0.5s"};
  }
`;
