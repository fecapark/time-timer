import styled from "@emotion/styled";
import { IItemDrawerStyleProps } from "./MobileMenu.type";

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

  .header {
    margin-bottom: 12px;

    .icon-wrapper {
      display: inline-flex;
      justify-content: center;
      align-items: center;

      border-radius: 50%;
      padding: 8px;

      &:hover {
        background-color: #323236;
      }

      svg {
        font-size: 26px;
      }
    }
  }

  .content {
    height: 100%;
    overflow-y: auto;
  }

  .footer {
    padding: 16px;

    font-family: ${({ theme }) => theme.font.family.primary};
    font-size: 12px;
    color: #a0a0a0;

    text-align: center;
  }
`;

export const ItemDrawerContainer = styled.div<IItemDrawerStyleProps>`
  .drawer {
    padding-left: 16px;

    overflow: hidden;
    max-height: ${(props) =>
      props.isOpened ? props.itemCount * 40 + 10 : "0"}px;
    transition: 0.3s cubic-bezier(0.2, 0, 0, 1);
  }
`;

export const ItemContainer = styled.div`
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

export const OpenLinkItemContainer = styled(ItemContainer)`
  a {
    all: unset;

    color: inherit;
    font-size: 1em;
    width: 100%;
    height: 100%;

    display: inherit;
    justify-content: inherit;
    align-items: inherit;
  }
`;

export const ColorThumbnail = styled.div<{ color: string }>`
  width: 20px;
  height: 20px;

  border-radius: 4px;

  background-color: ${(props) => props.color};
`;
