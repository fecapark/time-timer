import {
  MdAllInbox,
  MdDesktopWindows,
  MdKeyboardArrowLeft,
  MdNotifications,
  MdOpenInNew,
  MdOutlineDesktopWindows,
  MdOutlineNotifications,
  MdTranslate,
} from "react-icons/md";
import { BsGithub } from "react-icons/bs";
import { IoMdTime } from "react-icons/io";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  isSliderActiveAtom as ISA,
  languageOptionValueAtom as LOV,
  isTimingNowAtom as ITN,
  isClockPointerDownAtom as ICPD,
} from "../../../shared/atom";
import { Theme } from "../../../styles/theme";
import useMediaMatch from "../../../hooks/useMediaMatch";
import {
  Container,
  MainMenuBar,
  SectionItemContainer,
  SectionLinkItemContainer,
  SliderContainer,
} from "./FixedMenu.styled";
import {
  IItemProps,
  IOpenLinkItemProps,
  ISliderProps,
  MenuSectionType,
} from "./FixedMenu.type";
import { ActionIconWrapper, OpenLink } from "../menu.styled";
import NotificationSectionContent from "./contents/Notification";
import DisplaySectionContent from "./contents/Display";
import LanguageSectionContent from "./contents/Language";
import TimeSectionContent from "./contents/Time";
import { useQuery } from "@tanstack/react-query";
import { getOptionFromDB, OPTION_DB_KEY } from "../../../hooks/useIDB";
import { useOptionSetEffect } from "../menu.util";
import Link from "next/link";

function Slider({ children, onClose }: ISliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const isClockPointerDown = useRecoilValue(ICPD);
  const isTimingNow = useRecoilValue(ITN);
  const [isSliderActive, setIsSliderActive] = useRecoilState(ISA);
  const [isHideTimer] = useMediaMatch(Theme.mediaQueries.hideTimerMaxWidth);

  const closeSlider = () => {
    setIsSliderActive(false);
  };

  const handleSliderToggleTransition = () => {
    if (!sliderRef.current) return;

    if (isSliderActive) {
      sliderRef.current.ontransitionend = null;
    } else {
      sliderRef.current.ontransitionend = () => {
        onClose();
        sliderRef.current!.ontransitionend = null;
      };
    }
  };

  useEffect(() => {
    handleSliderToggleTransition();
  }, [isSliderActive]);

  useEffect(() => {
    closeSlider();
  }, [isHideTimer]);

  useEffect(() => {
    if (!isClockPointerDown && !isTimingNow) return;
    closeSlider();
  }, [isClockPointerDown, isTimingNow]);

  return (
    <SliderContainer
      ref={sliderRef}
      active={isSliderActive}
      triggerInteractionHide={isClockPointerDown || isTimingNow}
    >
      <div className="border-left"></div>
      <div className="slider-header">
        <ActionIconWrapper onClick={closeSlider}>
          <MdKeyboardArrowLeft />
        </ActionIconWrapper>
      </div>
      <div>{children}</div>
    </SliderContainer>
  );
}

function SectionItem({
  defaultIcon,
  selectedIcon,
  text,
  selected = false,
  onClick = () => {},
}: IItemProps) {
  const setIsSliderActive = useSetRecoilState(ISA);

  const openSlider = () => {
    setIsSliderActive(true);
  };

  return (
    <SectionItemContainer
      active={selected}
      onClick={() => {
        openSlider();
        onClick();
      }}
    >
      <div className="icon-wrapper">
        {selected && selectedIcon ? selectedIcon : defaultIcon}
      </div>
      <span className="item-text">{text}</span>
    </SectionItemContainer>
  );
}

function SectionLinkItem({ icon, text, href }: IOpenLinkItemProps) {
  return (
    <Link
      href={href}
      style={{ textDecoration: "none", WebkitTapHighlightColor: "transparent" }}
    >
      <SectionLinkItemContainer active={false}>
        <div className="icon-wrapper">{icon}</div>
        <span className="item-text">{text}</span>
      </SectionLinkItemContainer>
    </Link>
  );
}

function OpenLinkItem({ icon, text, href }: IOpenLinkItemProps) {
  return (
    <SectionItemContainer active={false}>
      <OpenLink href={href} target="_blank" rel="noopener noreferrer">
        <div className="icon-wrapper">{icon}</div>
        <span className="item-text">{text}</span>
      </OpenLink>
    </SectionItemContainer>
  );
}

export default function FixedMenu() {
  const isClockPointerDown = useRecoilValue(ICPD);
  const isTimingNow = useRecoilValue(ITN);
  const language = useRecoilValue(LOV);
  const [section, setSection] = useState<MenuSectionType | null>(null);

  const sectionContents: Record<MenuSectionType, React.ReactNode> = {
    language: <LanguageSectionContent />,
    display: <DisplaySectionContent />,
    notification: <NotificationSectionContent />,
    time: <TimeSectionContent />,
  };

  return (
    <Container triggerHide={isClockPointerDown || isTimingNow}>
      <Slider
        onClose={() => {
          setSection(null);
        }}
      >
        {section && section in sectionContents
          ? sectionContents[section]
          : null}
      </Slider>
      <MainMenuBar>
        <div className="section">
          <SectionLinkItem
            href="/records"
            icon={<MdAllInbox />}
            text="Records"
          />

          <div style={{ height: "24px" }}></div>

          <SectionItem
            defaultIcon={<IoMdTime />}
            text={language === "kor" ? "시간" : "Time"}
            selected={section === "time"}
            onClick={() => setSection("time")}
          />
          <SectionItem
            defaultIcon={<MdOutlineDesktopWindows />}
            selectedIcon={<MdDesktopWindows />}
            text={language === "kor" ? "화면" : "Display"}
            selected={section === "display"}
            onClick={() => setSection("display")}
          ></SectionItem>
          <SectionItem
            defaultIcon={<MdTranslate />}
            text={language === "kor" ? "언어" : "Language"}
            selected={section === "language"}
            onClick={() => setSection("language")}
          />
          <SectionItem
            defaultIcon={<MdOutlineNotifications />}
            selectedIcon={<MdNotifications />}
            text={language === "kor" ? "알림" : "Notification"}
            selected={section === "notification"}
            onClick={() => setSection("notification")}
          ></SectionItem>

          <div style={{ height: "24px" }}></div>
        </div>
        <div className="section">
          <OpenLinkItem
            icon={<MdOpenInNew />}
            text="Time Timer"
            href="https://www.timetimer.com"
          />
          <OpenLinkItem
            icon={<BsGithub />}
            text="Github"
            href="https://github.com/fecapark/time-timer"
          />
        </div>
      </MainMenuBar>
    </Container>
  );
}
