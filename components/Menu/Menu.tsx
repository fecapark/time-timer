import styled from "@emotion/styled";
import React, { useState } from "react";
import {
  MdMenuOpen,
  MdOpenInNew,
  MdOutlineArrowDropDown,
  MdOutlineArrowDropUp,
} from "react-icons/md";
import { useRecoilState, useRecoilValue } from "recoil";
import useModal from "../../hooks/useModal";
import {
  isActiveMenuAtom as IAM,
  languageOptionValueAtom as LOV,
  clockColorValueAtom as CCV,
} from "../../shared/atom";
import { Theme } from "../../styles/theme";
import SupportingInfoModal from "../Modal/contents/SupportingInfoModal/SupportingInfoModal";

const MenuContainer = styled.div<{ isActive: boolean }>`
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

const Background = styled.div<{ isActive: boolean }>`
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

const MenuContentContainer = styled.div<{ isActive: boolean }>`
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

    font-size: 12px;
    color: #a0a0a0;

    text-align: center;
  }
`;

const ItemDrawerContainer = styled.div<IItemDrawerStyleProps>`
  .drawer {
    padding-left: 16px;

    overflow: hidden;
    max-height: ${(props) =>
      props.isOpened ? props.itemCount * 40 + 10 : "0"}px;
    transition: 0.3s cubic-bezier(0.2, 0, 0, 1);
  }
`;

const ItemContainer = styled.div`
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

const OpenLinkItemContainer = styled(ItemContainer)`
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

const ColorThumbnail = styled.div<{ color: string }>`
  width: 20px;
  height: 20px;

  border-radius: 4px;

  background-color: ${(props) => props.color};
`;

interface IItemDrawerStyleProps {
  itemCount: number;
  isOpened: boolean;
}

interface IItemDrawerProps {
  content: string;
  children: React.ReactNode;
}

interface IItemProps {
  content: React.ReactNode;
  selected?: boolean;
  onClick?: React.MouseEventHandler;
}

interface IOpenLinkItemProps {
  content: React.ReactNode;
  href: string;
}

function Item({ content, selected = false, onClick }: IItemProps) {
  const language = useRecoilValue(LOV);

  return (
    <ItemContainer onClick={onClick}>
      <span>{content}</span>
      {selected ? (
        <span style={{ fontSize: 13 }}>
          {language === "kor" ? "사용중" : "Selected"}
        </span>
      ) : null}
    </ItemContainer>
  );
}

function HeadDrawerItem({ content, selected = false, onClick }: IItemProps) {
  return (
    <ItemContainer onClick={onClick}>
      <span>{content}</span>
      {selected ? <MdOutlineArrowDropUp /> : <MdOutlineArrowDropDown />}
    </ItemContainer>
  );
}

function OpenLinkItem({ content, href }: IOpenLinkItemProps) {
  return (
    <OpenLinkItemContainer>
      <a href={href} target="_blank" rel="noopener noreferrer">
        <span>{content}</span>
        <MdOpenInNew />
      </a>
    </OpenLinkItemContainer>
  );
}

function ItemDrawer({ content, children }: IItemDrawerProps) {
  const [isOpened, setIsOpened] = useState(false);

  const toggleDrawer = () => {
    setIsOpened((prev) => !prev);
  };

  return (
    <ItemDrawerContainer
      isOpened={isOpened}
      itemCount={React.Children.count(children)}
    >
      <HeadDrawerItem
        content={content}
        selected={isOpened}
        onClick={toggleDrawer}
      />
      <div className="drawer">{children}</div>
    </ItemDrawerContainer>
  );
}

export default function Menu() {
  const [isActive, setIsActive] = useRecoilState(IAM);
  const [language, setLanguage] = useRecoilState(LOV);
  const [clockColor, setClockColor] = useRecoilState(CCV);

  const setSupportModalActive = useModal({
    title:
      language === "kor"
        ? "백그라운드 푸쉬 알림 지원을 확인하세요"
        : "Check background push notification supports",
    content: <SupportingInfoModal notSupport={false} />,
  });

  const closeMenu = () => {
    setIsActive(false);
  };

  return (
    <MenuContainer isActive={isActive}>
      <Background isActive={isActive} onClick={closeMenu} />
      <MenuContentContainer isActive={isActive}>
        <div className="header" style={{ padding: 8 }}>
          <div className="icon-wrapper" onClick={closeMenu}>
            <MdMenuOpen />
          </div>
        </div>
        <div className="content">
          <ItemDrawer content={language === "kor" ? "언어" : "Language"}>
            <Item
              content="한국어"
              selected={language === "kor"}
              onClick={() => {
                setLanguage("kor");
              }}
            />
            <Item
              content="English"
              selected={language === "en"}
              onClick={() => {
                setLanguage("en");
              }}
            />
          </ItemDrawer>
          <ItemDrawer content={language === "kor" ? "색상" : "Color"}>
            <Item
              content={<ColorThumbnail color={Theme.clock.color.red} />}
              selected={clockColor === "red"}
              onClick={() => {
                setClockColor("red");
              }}
            />
            <Item
              content={<ColorThumbnail color={Theme.clock.color.blue} />}
              selected={clockColor === "blue"}
              onClick={() => {
                setClockColor("blue");
              }}
            />
            <Item
              content={<ColorThumbnail color={Theme.clock.color.yellow} />}
              selected={clockColor === "yellow"}
              onClick={() => {
                setClockColor("yellow");
              }}
            />
          </ItemDrawer>
          <ItemDrawer content={language === "kor" ? "알림" : "Notification"}>
            <Item
              content={
                language === "kor"
                  ? "알람 소리 미리 듣기"
                  : "Preview alarm sound"
              }
            />
            <Item
              content={
                language === "kor"
                  ? "백그라운드 푸쉬 알림 지원"
                  : "About push notification"
              }
              onClick={() => {
                closeMenu();
                setSupportModalActive(true);
              }}
            />
          </ItemDrawer>
          <div style={{ margin: "24px 0" }} />
          <OpenLinkItem content="Time Timer" href="https://www.timetimer.com" />
          <OpenLinkItem
            content="Github"
            href="https://github.com/fecapark/time-timer"
          />
        </div>
        <div className="footer">
          <span>
            Copyright &copy; 2022 Sanghyeok Park.
            <br />
            All rights reserved.
          </span>
        </div>
      </MenuContentContainer>
    </MenuContainer>
  );
}
