import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { ItemContainer } from "../menu.styled";

export const MenuContainer = styled.div<{ isActive: boolean }>`
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  opacity: ${(props) => (props.isActive ? "1" : "0")};
  visibility: ${(props) => (props.isActive ? "visible" : "hidden")};

  transition: ${(props) =>
    props.isActive
      ? "none"
      : `
    opacity 0s linear 0.2s,
    visibility 0s linear 0.2s
  `};
`;

export const Background = styled.div<{ isActive: boolean }>`
  width: 100%;
  height: 100%;

  background-color: #00000044;

  transition: opacity
    ${(props) =>
      props.isActive
        ? "0.3s cubic-bezier(0.2, 0, 0, 1)"
        : "0.2s cubic-bezier(0, 0, 0, 1)"};
  opacity: ${(props) => (props.isActive ? "1" : "0")};
`;

export const MenuContentContainer = styled.div<{ isActive: boolean }>`
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  flex-direction: column;

  height: 100%;
  font-family: ${({ theme }) => theme.font.family.openSans};
  font-size: 16px;
  font-weight: 500;
  padding: ${({ theme }) => theme.font.bodySize * 2.5 - 16}px 20px;

  background-color: ${({ theme }) => theme.background.primary};
  border-top-right-radius: 24px;
  border-bottom-right-radius: 24px;

  transition: transform
    ${(props) =>
      props.isActive
        ? "0.3s cubic-bezier(0.2, 0, 0, 1)"
        : "0.2s cubic-bezier(0, 0, 0, 1)"};
  transform: translate3d(${(props) => (props.isActive ? "0" : "-100%")}, 0, 0);

  .content {
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background-color: #00000000;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #ffffff55;
      border-radius: 1000px;
    }

    ${({ theme }) => theme.shareCSS.scrollbarMoz("thin", "#ffffff55")}
  }

  .footer {
    padding: 16px;

    font-family: ${({ theme }) => theme.font.family.primary};
    font-size: 12px;
    color: #a0a0a0;

    text-align: center;
  }

  @media screen and (max-width: 768px) {
    padding-top: ${({ theme }) => theme.font.bodySize * 1.5 - 16}px;
  }
`;

export const FadeFromRightKeyframe = keyframes`
  from {
    opacity: 0;
    transform: translate3d(20px, 0, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;
export const FadeFromRightAnimationCSS = css`
  opacity: 0;
  animation: ${FadeFromRightKeyframe} 0.4s cubic-bezier(0.2, 0, 0, 1) forwards;
`;

export const FadeFromLeftKeyframe = keyframes`
  from {
    opacity: 0;
    transform: translate3d(-20px, 0, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;
export const FadeFromLeftAnimationCSS = css`
  opacity: 0;
  animation: ${FadeFromLeftKeyframe} 0.4s cubic-bezier(0.2, 0, 0, 1) forwards;
`;

export const ContentHeaderContainer = styled.div`
  margin-bottom: 12px;
  padding: 8px;
`;

export const ContentTitle = styled.h1`
  font-size: 15px;
  padding: 1em 1.35em;
  padding-top: 0;

  .title {
    font-size: 1.5em;
    font-weight: 600;
  }
`;

export const RouterItemContainer = styled(ItemContainer)`
  text-decoration: none;

  svg {
    font-size: 1.6em;
  }
`;
