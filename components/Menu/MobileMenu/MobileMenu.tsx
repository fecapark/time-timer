import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import {
  MdMenuOpen,
  MdOpenInNew,
  MdOutlineArrowDropDown,
  MdOutlineArrowDropUp,
} from "react-icons/md";
import { useRecoilState, useRecoilValue } from "recoil";
import useIsomorphicEffect from "../../../hooks/useIsomorphicEffect";
import useMediaMatch from "../../../hooks/useMediaMatch";
import useModal from "../../../hooks/useModal";
import useOptionStorage from "../../../hooks/useOptionStorage";
import {
  isActiveMenuAtom as IAM,
  languageOptionValueAtom as LOV,
  clockColorValueAtom as CCV,
  progressUnitValueAtom as PUV,
} from "../../../shared/atom";
import { ClockColorType } from "../../../shared/types";
import { Theme } from "../../../styles/theme";
import PreviewSoundModal from "../../Modal/contents/PreviewSoundModal/PreviewSoundModal";
import SupportingInfoModal from "../../Modal/contents/SupportingInfoModal/SupportingInfoModal";
import {
  Background,
  ColorThumbnail,
  ItemContainer,
  ItemDrawerContainer,
  MenuContainer,
  MenuContentContainer,
  OpenLinkItemContainer,
} from "./MobileMenu.styled";
import {
  IItemDrawerProps,
  IItemProps,
  IOpenLinkItemProps,
} from "./MobileMenu.type";

function Item({ content, selected = false, onClick }: IItemProps) {
  const language = useRecoilValue(LOV);

  return (
    <ItemContainer onClick={onClick}>
      <span>{content}</span>
      {selected ? (
        <span style={{ fontSize: 13, fontWeight: 400, marginLeft: 40 }}>
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

export default function MobileMenu() {
  const [isActive, setIsActive] = useRecoilState(IAM);
  const [language, setLanguage] = useRecoilState(LOV);
  const [clockColor, setClockColor] = useRecoilState(CCV);
  const [progressUnit, setProgressUnit] = useRecoilState(PUV);
  const [isHideTimer] = useMediaMatch(Theme.mediaQueries.hideTimerMaxWidth);
  const setSupportModalActive = useModal({
    title:
      language === "kor"
        ? "백그라운드 푸쉬 알림 지원을 확인하세요"
        : "Check background push notification supports",
    content: <SupportingInfoModal notSupport={false} />,
  });
  const setPreviewSoundModalActive = useModal({
    title:
      language === "kor"
        ? "알람 소리를 미리 들어보세요"
        : "Preview alarm sound before start",
    content: <PreviewSoundModal />,
  });
  const [optionValue, setOptionStorageValue, canAccessToOptionStorage] =
    useOptionStorage();

  const closeMenu = () => {
    setIsActive(false);
  };

  useEffect(() => {
    closeMenu();
  }, [isHideTimer]);

  useIsomorphicEffect(() => {
    if (!canAccessToOptionStorage) return;
    setLanguage(optionValue.language);
    setClockColor(optionValue.clockColor);
    setProgressUnit(optionValue.progressUnit);
  }, [optionValue, canAccessToOptionStorage]);

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
                setOptionStorageValue({ language: "kor" });
              }}
            />
            <Item
              content="English"
              selected={language === "en"}
              onClick={() => {
                setOptionStorageValue({ language: "en" });
              }}
            />
          </ItemDrawer>
          <ItemDrawer content={language === "kor" ? "색상" : "Color"}>
            {Object.entries(Theme.clock.color).map(([colorName, value]) => {
              return (
                <Item
                  key={value}
                  content={<ColorThumbnail color={value} />}
                  selected={clockColor === colorName}
                  onClick={() => {
                    setOptionStorageValue({
                      clockColor: colorName as ClockColorType,
                    });
                  }}
                />
              );
            })}
          </ItemDrawer>
          <ItemDrawer content={language === "kor" ? "시간 단위" : "Progress"}>
            <Item
              content={
                language === "kor" ? "분과 초로 나타내기" : "Show as min/sec"
              }
              selected={progressUnit === "time"}
              onClick={() => {
                setOptionStorageValue({ progressUnit: "time" });
              }}
            />
            <Item
              content={
                language === "kor" ? "백분위로 나타내기" : "Show as percentage"
              }
              selected={progressUnit === "percentage"}
              onClick={() => {
                setOptionStorageValue({ progressUnit: "percentage" });
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
              onClick={() => {
                closeMenu();
                setPreviewSoundModalActive(true);
              }}
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
