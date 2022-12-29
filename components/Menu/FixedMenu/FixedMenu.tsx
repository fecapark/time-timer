import {
  MdKeyboardArrowLeft,
  MdNotifications,
  MdOpenInNew,
  MdOutlineNotifications,
  MdOutlinePalette,
  MdPalette,
  MdTranslate,
} from "react-icons/md";
import { BsGithub } from "react-icons/bs";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  isSliderActiveAtom as ISA,
  languageOptionValueAtom as LOV,
  clockColorValueAtom as CCV,
  isTimingNowAtom as ITN,
  isClockPointerDownAtom as ICPD,
} from "../../../shared/atom";
import { Theme } from "../../../styles/theme";
import useModal from "../../../hooks/useModal";
import SupportingInfoModal from "../../Modal/contents/SupportingInfoModal/SupportingInfoModal";
import PreviewSoundModal from "../../Modal/contents/PreviewSoundModal/PreviewSoundModal";
import useMediaMatch from "../../../hooks/useMediaMatch";
import {
  ColorThumbnail,
  Container,
  ItemContainer,
  MainMenuBar,
  OpenLinkItemContainer,
  SliderContainer,
  SliderItemContainer,
} from "./FixedMenu.styled";
import {
  IItemProps,
  IOpenLinkItemProps,
  ISliderItemProps,
  ISliderProps,
  MenuSectionType,
} from "./FixedMenu.type";
import { ClockColorType } from "../../../shared/types";
import useOptionStorage from "../../../hooks/useOptionStorage";
import useIsomorphicEffect from "../../../hooks/useIsomorphicEffect";

function SliderItem({
  content,
  selected = false,
  onClick = () => {},
}: ISliderItemProps) {
  const language = useRecoilValue(LOV);

  return (
    <SliderItemContainer onClick={onClick}>
      <span>{content}</span>
      {selected ? (
        <span style={{ fontSize: 13 }}>
          {language === "kor" ? "사용중" : "Selected"}
        </span>
      ) : null}
    </SliderItemContainer>
  );
}

function Slider({ selector, onClose }: ISliderProps) {
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
        <div className="icon-wrapper" onClick={closeSlider}>
          <MdKeyboardArrowLeft />
        </div>
      </div>
      <div>{selector()}</div>
    </SliderContainer>
  );
}

function Item({
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
    <ItemContainer
      active={selected}
      onClick={() => {
        onClick();
        openSlider();
      }}
    >
      <div className="icon-wrapper">
        {selected && selectedIcon ? selectedIcon : defaultIcon}
      </div>
      <span className="item-text">{text}</span>
    </ItemContainer>
  );
}

function OpenLinkItem({ icon, text, href }: IOpenLinkItemProps) {
  return (
    <OpenLinkItemContainer active={false}>
      <a href={href} target="_blank" rel="noopener noreferrer">
        <div className="icon-wrapper">{icon}</div>
        <span className="item-text">{text}</span>
      </a>
    </OpenLinkItemContainer>
  );
}

export default function FixedMenu() {
  const isClockPointerDown = useRecoilValue(ICPD);
  const isTimingNow = useRecoilValue(ITN);
  const [section, setSection] = useState<MenuSectionType | null>(null);
  const [language, setLanguage] = useRecoilState(LOV);
  const [clockColor, setClockColor] = useRecoilState(CCV);
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

  const sectionContents: Record<MenuSectionType, React.ReactNode> = {
    language: (
      <>
        <SliderItem
          content="한국어"
          selected={language === "kor"}
          onClick={() => {
            setOptionStorageValue({ language: "kor" });
          }}
        />
        <SliderItem
          content="English"
          selected={language === "en"}
          onClick={() => {
            setOptionStorageValue({ language: "en" });
          }}
        />
      </>
    ),
    color: (
      <>
        {Object.entries(Theme.clock.color).map(([colorName, value]) => {
          return (
            <SliderItem
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
      </>
    ),
    notification: (
      <>
        <SliderItem
          content={
            language === "kor" ? "알람 소리 미리 듣기" : "Preview alarm sound"
          }
          onClick={() => {
            setPreviewSoundModalActive(true);
          }}
        />
        <SliderItem
          content={
            language === "kor"
              ? "백그라운드 푸쉬 알림 지원"
              : "About push notification"
          }
          onClick={() => {
            setSupportModalActive(true);
          }}
        />
      </>
    ),
  };

  const sliderContentSelector = () => {
    if (!section) return null;
    if (section in sectionContents) return sectionContents[section];
    return null;
  };

  useIsomorphicEffect(() => {
    if (!canAccessToOptionStorage) return;
    setLanguage(optionValue.language);
    setClockColor(optionValue.clockColor);
  }, [optionValue, canAccessToOptionStorage]);

  return (
    <Container triggerHide={isClockPointerDown || isTimingNow}>
      <Slider
        selector={sliderContentSelector}
        onClose={() => {
          setSection(null);
        }}
      />
      <MainMenuBar>
        <div className="section">
          <Item
            defaultIcon={<MdTranslate />}
            text={language === "kor" ? "언어" : "Language"}
            selected={section === "language"}
            onClick={() => setSection("language")}
          />
          <Item
            defaultIcon={<MdOutlinePalette />}
            selectedIcon={<MdPalette />}
            text={language === "kor" ? "색상" : "Color"}
            selected={section === "color"}
            onClick={() => setSection("color")}
          ></Item>
          <Item
            defaultIcon={<MdOutlineNotifications />}
            selectedIcon={<MdNotifications />}
            text={language === "kor" ? "알림" : "Notification"}
            selected={section === "notification"}
            onClick={() => setSection("notification")}
          ></Item>
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
