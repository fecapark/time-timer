import { keyframes, css } from "@emotion/react";
import styled from "@emotion/styled";
import { ItemContainer } from "../menu.styled";
import { ISliderContainerStyleProps } from "./FixedMenu.type";

export const Container = styled.div<{ triggerHide: boolean }>`
  position: fixed;
  top: 0;
  left: 0;

  height: 100%;

  transform: translate3d(
    ${(props) => (props.triggerHide ? "-100%" : "0")},
    0,
    0
  );
  transition: transform
    ${(props) =>
      props.triggerHide
        ? "0.5s cubic-bezier(0.2, 0, 0, 1) 0.4s"
        : "0.3s cubic-bezier(0, 0, 0, 1) 0.4s"};
`;

export const MainMenuBar = styled.div`
  position: relative;
  background-color: #29292b;

  padding-top: 28px;
  padding-bottom: calc(13px * 0.3);
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

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
`;

export const SliderContainer = styled.div<ISliderContainerStyleProps>`
  position: absolute;
  top: 0;
  left: 88px;
  background-color: #29292b;

  height: 100%;
  padding: 8px;

  border-top-right-radius: 24px;
  border-bottom-right-radius: 24px;

  transform: translate3d(${(props) => (props.active ? "0" : "-100%")}, 0, 0);
  transition: transform
    ${(props) =>
      props.triggerInteractionHide
        ? "0.5s cubic-bezier(0.2, 0, 0, 1) 0.1s"
        : props.active
        ? "0.3s cubic-bezier(0.2, 0, 0, 1)"
        : "0.2s cubic-bezier(0, 0, 0, 1)"};

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

  .border-left {
    position: absolute;
    top: 0;
    left: 0;

    width: 1px;
    height: 100%;

    background-color: #484850;
  }

  .slider-header {
    width: 100%;
  }
`;

export const SectionItemContainer = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.3em;

  width: 88px;
  margin-bottom: 28px;

  font-size: 13px;
  font-family: ${({ theme }) => theme.font.family.openSans};
  color: #e0e0e0;

  -webkit-tap-highlight-color: transparent;
  cursor: pointer;

  .icon-wrapper {
    display: inline-flex;
    justify-content: center;
    align-items: center;

    padding: 0.3em 1.2em;
    border-radius: 1000px;

    background-color: ${(props) =>
      props.active ? props.theme.background.hoverAccent : "none"};
    transition: background-color 0.1s cubic-bezier(0, 0, 0, 1);

    svg {
      font-size: 1.8em;
    }
  }

  &:hover .icon-wrapper {
    background-color: ${({ theme }) => theme.background.hoverAccent};
    transition: background-color 0.15s cubic-bezier(0.2, 0, 0, 1);
  }

  .item-text {
    font-weight: 500;
  }
`;

export const DrawerHeadItem = styled(ItemContainer)``;

const FadeContentKeyframe = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

export const FadeContentAnimationCSS = css`
  animation: ${FadeContentKeyframe} 0.5s cubic-bezier(0.2, 0, 0, 1) forwards;
`;

export const SectionLinkItemContainer = styled(SectionItemContainer)``;
