import React, { useEffect, useRef, useState } from "react";
import {
  MdArrowBack,
  MdArrowForward,
  MdMenuOpen,
  MdOpenInNew,
  MdOutlineArrowDropDown,
  MdOutlineArrowDropUp,
} from "react-icons/md";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import useIsomorphicEffect from "../../../hooks/useIsomorphicEffect";
import useMediaMatch from "../../../hooks/useMediaMatch";
import useModal from "../../../hooks/useModal";
import useOptionStorage from "../../../hooks/useOptionStorage";
import {
  isActiveMenuAtom as IAM,
  languageOptionValueAtom as LOV,
  clockColorValueAtom as CCV,
  progressUnitValueAtom as PUV,
  mobileMenuContentAtom as MMC,
} from "../../../shared/atom";
import { ClockColorType, MenuContentType } from "../../../shared/types";
import { Theme } from "../../../styles/theme";
import PreviewSoundModal from "../../Modal/contents/PreviewSoundModal/PreviewSoundModal";
import SupportingInfoModal from "../../Modal/contents/SupportingInfoModal/SupportingInfoModal";
import { ItemDrawer, SelectableItem } from "../menu";
import {
  ActionIconWrapper,
  ColorThumbnail,
  ItemContainer,
  OpenLink,
} from "../menu.styled";
import {
  Background,
  ContentHeaderContainer,
  FadeFromLeftAnimationCSS,
  FadeFromRightAnimationCSS,
  MenuContainer,
  MenuContentContainer,
} from "./MobileMenu.styled";
import {
  IContentHeaderProps,
  IMenuContentLinkerProps,
  IMenuContentValue,
  IOpenLinkItemProps,
} from "./MobileMenu.type";

function OpenLinkItem({ content, href }: IOpenLinkItemProps) {
  return (
    <ItemContainer>
      <OpenLink href={href} target="_blank" rel="noopener noreferrer">
        <span>{content}</span>
        <MdOpenInNew />
      </OpenLink>
    </ItemContainer>
  );
}

function ContentHeader({ icon, onIconClick }: IContentHeaderProps) {
  return (
    <ContentHeaderContainer>
      <ActionIconWrapper onClick={onIconClick}>{icon}</ActionIconWrapper>
    </ContentHeaderContainer>
  );
}

function MenuContentLinker({ content, linkTo }: IMenuContentLinkerProps) {
  const setMenuContent = useSetRecoilState(MMC);

  const switchContent = () => {
    setMenuContent(linkTo);
  };

  return (
    <ItemContainer onClick={switchContent}>
      <span>{content}</span>
      <MdArrowForward />
    </ItemContainer>
  );
}

export default function MobileMenu() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useRecoilState(IAM);
  const [language, setLanguage] = useRecoilState(LOV);
  const [clockColor, setClockColor] = useRecoilState(CCV);
  const [progressUnit, setProgressUnit] = useRecoilState(PUV);
  const [menuContent, setMenuContent] = useRecoilState(MMC);
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

  const contents: Record<MenuContentType, IMenuContentValue> = {
    main: {
      header: <ContentHeader icon={<MdMenuOpen />} onIconClick={closeMenu} />,
      content: (
        <div css={FadeFromLeftAnimationCSS}>
          <ItemDrawer content={language === "kor" ? "언어" : "Language"}>
            <SelectableItem
              content="한국어"
              selected={language === "kor"}
              onClick={() => {
                setOptionStorageValue({ language: "kor" });
              }}
            />
            <SelectableItem
              content="English"
              selected={language === "en"}
              onClick={() => {
                setOptionStorageValue({ language: "en" });
              }}
            />
          </ItemDrawer>
          <MenuContentLinker
            content={language === "kor" ? "화면" : "Display"}
            linkTo="display"
          />
          <ItemDrawer content={language === "kor" ? "알림" : "Notification"}>
            <SelectableItem
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
            <SelectableItem
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
      ),
    },
    display: {
      header: (
        <ContentHeader
          icon={<MdArrowBack />}
          onIconClick={() => {
            setMenuContent("main");
          }}
        />
      ),
      content: (
        <div css={FadeFromRightAnimationCSS}>
          <ItemDrawer content={language === "kor" ? "색상" : "Color"}>
            {Object.entries(Theme.clock.color).map(([colorName, value]) => {
              return (
                <SelectableItem
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
            <SelectableItem
              content={
                language === "kor" ? "분과 초로 나타내기" : "Show as min/sec"
              }
              selected={progressUnit === "time"}
              onClick={() => {
                setOptionStorageValue({ progressUnit: "time" });
              }}
            />
            <SelectableItem
              content={
                language === "kor" ? "백분위로 나타내기" : "Show as percentage"
              }
              selected={progressUnit === "percentage"}
              onClick={() => {
                setOptionStorageValue({ progressUnit: "percentage" });
              }}
            />
          </ItemDrawer>
        </div>
      ),
    },
  };

  useEffect(() => {
    setMenuContent("main");
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
        {contents[menuContent].header}
        <div ref={contentRef} className="content">
          {contents[menuContent].content}
        </div>
        {menuContent === "main" ? (
          <div className="footer">
            <span>
              Copyright &copy; 2022 Sanghyeok Park.
              <br />
              All rights reserved.
            </span>
          </div>
        ) : null}
      </MenuContentContainer>
    </MenuContainer>
  );
}
