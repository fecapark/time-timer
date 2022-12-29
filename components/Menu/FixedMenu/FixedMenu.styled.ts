import styled from "@emotion/styled";
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

    .icon-wrapper {
      display: inline-flex;
      justify-content: center;
      align-items: center;

      padding: 8px;
      border-radius: 50%;

      &:hover {
        background-color: #323236;
      }

      svg {
        font-size: 22px;
      }
    }
  }
`;

export const ItemContainer = styled.div<{ active: boolean }>`
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

export const OpenLinkItemContainer = styled(ItemContainer)`
  a {
    all: unset;

    color: inherit;
    font-size: 1em;
    width: 100%;
    height: 100%;

    display: inherit;
    flex-direction: inherit;
    justify-content: inherit;
    align-items: inherit;
  }
`;

export const SliderItemContainer = styled.div`
  width: 100%;
  min-height: 40px;
  min-width: 240px;

  font-size: 15px;
  padding: 0.6em 1.35em;
  border-radius: 10000px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  color: #e0e0e0;

  &:hover {
    background-color: ${({ theme }) => theme.background.hoverAccent};
  }
`;

export const ColorThumbnail = styled.div<{ color: string }>`
  width: 20px;
  height: 20px;

  border-radius: 4px;

  background-color: ${(props) => props.color};
`;
