import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Theme } from "../../../styles/theme";

export const IconContainer = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  padding: 8px;
  border-radius: 50%;

  transform: translate3d(-8px, -8px, 0);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background-color: #323236;
  }

  svg {
    color: white;
    font-size: 26px;
  }
`;

interface TimeTextStyleProps {
  triggerHide: boolean;
  fontSize: number;
}

export const TimeText = styled.div<TimeTextStyleProps>`
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
        : "0.3s cubic-bezier(0, 0, 0, 1) 0.4s"};
`;

export const ContainerCSS = css`
  font-size: 18px;

  width: 100%;
  height: 60px;

  padding: 0 2em;

  display: flex;
  justify-content: center;
  align-items: flex-start;

  .logo {
    ${Theme.shareCSS.noDrag};

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

  .dummy {
    opacity: 0;
    visibility: hidden;
  }

  @media screen and (max-width: ${Theme.responsiveSizes.resizeClockWidth}px) {
    justify-self: flex-start;
  }

  @media screen and (max-width: ${Theme.responsiveSizes.hideTimer}px) {
    font-size: 15px;
  }
`;

export const Container = styled.header<{
  hasMenuIcon: boolean;
  triggerHide: boolean;
}>`
  ${ContainerCSS}

  justify-content: ${(props) =>
    props.hasMenuIcon ? "space-between" : "center"};

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

  @media screen and (max-width: ${({ theme }) =>
      theme.responsiveSizes.hideTimer}px) {
    transition: transform
      ${(props) =>
        props.triggerHide
          ? "0.5s cubic-bezier(0.2, 0, 0, 1) 0.1s"
          : "0.3s cubic-bezier(0, 0, 0, 1) 0.5s"};
  }
`;
