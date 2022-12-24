import styled from "@emotion/styled";

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
  top: calc(-60px - ${(props) => props.fontSize}px);

  transform: translate3d(
    -50%,
    ${(props) =>
      props.triggerHide ? "0" : (60 + props.fontSize + 35).toString()}px,
    0
  );

  transition: transform
    ${(props) =>
      props.triggerHide
        ? "0.5s cubic-bezier(0.2, 0, 0, 1) 0.35s"
        : "0.3s cubic-bezier(0, 0, 0, 1) 0.2s"};
`;

export const Container = styled.header<{ triggerHide: boolean }>`
  font-size: 18px;

  width: 100%;
  height: 60px;

  display: flex;
  justify-content: center;
  align-items: flex-start;

  transform: translate3d(
    0,
    ${(props) => {
      if (!props.triggerHide) return "0";
      const res = 18 * 1.32 + props.theme.font.bodySize * 3;
      return (-res).toString() + "px";
    }},
    0
  );
  transition: transform
    ${(props) =>
      props.triggerHide
        ? "0.5s cubic-bezier(0.2, 0, 0, 1) 0.4s"
        : "0.3s cubic-bezier(0, 0, 0, 1) 0.4s"};

  .logo {
    ${({ theme }) => theme.shareCSS.noDrag};

    display: flex;
    gap: 0.11em;

    font-family: "Raleway", sans-serif;
    font-weight: 600;
    letter-spacing: 0.3px;

    .word {
      padding: 0.16em 0.33em;

      &.right {
        background-color: white;
        color: #212121;
      }
    }
  }

  @media screen and (max-width: ${({ theme }) =>
      theme.responsiveSizes.resizeClockWidth}px) {
    justify-self: flex-start;
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
