import styled from "@emotion/styled";
import { IItemDrawerStyleProps } from "./menu.type";

export const ItemContainer = styled.div`
  width: 100%;
  min-height: 40px;
  min-width: 280px;

  font-size: 15px;
  font-weight: 500;
  padding: 0.6em 1.35em;
  border-radius: 10000px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  color: #e0e0e0;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background-color: ${({ theme }) => theme.background.hoverAccent};
  }

  svg {
    font-size: 1.4em;
  }

  .info {
    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
      font-size: 1.2em;
    }
  }

  @media screen and (max-width: 280px) {
    min-width: 100vw;
  }
`;

export const ColorThumbnail = styled.div<{ color: string }>`
  width: 20px;
  height: 20px;

  border-radius: 4px;

  background-color: ${(props) => props.color};
`;

export const ActionIconWrapper = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  padding: 8px;
  border-radius: 50%;

  &:hover {
    background-color: #323236;
  }

  svg {
    font-size: 26px;
  }
`;

export const OpenLink = styled.a`
  all: unset;

  color: inherit;
  font-size: 1em;
  width: 100%;
  height: 100%;

  display: inherit;
  flex-direction: inherit;
  justify-content: inherit;
  align-items: inherit;
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
