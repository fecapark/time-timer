import {
  MdDesktopWindows,
  MdKeyboardArrowLeft,
  MdNotifications,
  MdOpenInNew,
  MdOutlineArrowDropDown,
  MdOutlineArrowDropUp,
  MdOutlineDesktopWindows,
  MdOutlineNotifications,
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
  progressUnitValueAtom as PUV,
} from "../../../shared/atom";
import { Theme } from "../../../styles/theme";
import useModal from "../../../hooks/useModal";
import SupportingInfoModal from "../../Modal/contents/SupportingInfoModal/SupportingInfoModal";
import PreviewSoundModal from "../../Modal/contents/PreviewSoundModal/PreviewSoundModal";
import useMediaMatch from "../../../hooks/useMediaMatch";
import {
  Container,
  DrawerHeadItem,
  MainMenuBar,
  SectionItemContainer,
  SliderContainer,
} from "./FixedMenu.styled";
import {
  IItemDrawerProps,
  IItemProps,
  IOpenLinkItemProps,
  ISliderProps,
  MenuSectionType,
} from "./FixedMenu.type";
import { ClockColorType } from "../../../shared/types";
import useOptionStorage from "../../../hooks/useOptionStorage";
import useIsomorphicEffect from "../../../hooks/useIsomorphicEffect";
import {
  ActionIconWrapper,
  ColorThumbnail,
  ItemDrawerContainer,
  OpenLink,
} from "../menu.styled";
import { ItemDrawer, SelectableItem } from "../menu";

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
        <ActionIconWrapper onClick={closeSlider}>
          <MdKeyboardArrowLeft />
        </ActionIconWrapper>
      </div>
      <div>{selector()}</div>
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
        onClick();
        openSlider();
      }}
    >
      <div className="icon-wrapper">
        {selected && selectedIcon ? selectedIcon : defaultIcon}
      </div>
      <span className="item-text">{text}</span>
    </SectionItemContainer>
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
  const [section, setSection] = useState<MenuSectionType | null>(null);
  const [language, setLanguage] = useRecoilState(LOV);
  const [clockColor, setClockColor] = useRecoilState(CCV);
  const [progressUnit, setProgressUnit] = useRecoilState(PUV);
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
      </>
    ),
    display: (
      <>
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
      </>
    ),
    notification: (
      <>
        <SelectableItem
          content={
            language === "kor" ? "알람 소리 미리 듣기" : "Preview alarm sound"
          }
          onClick={() => {
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
    setProgressUnit(optionValue.progressUnit);
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
          <SectionItem
            defaultIcon={<MdTranslate />}
            text={language === "kor" ? "언어" : "Language"}
            selected={section === "language"}
            onClick={() => setSection("language")}
          />
          <SectionItem
            defaultIcon={<MdOutlineDesktopWindows />}
            selectedIcon={<MdDesktopWindows />}
            text={language === "kor" ? "화면" : "Display"}
            selected={section === "display"}
            onClick={() => setSection("display")}
          ></SectionItem>
          <SectionItem
            defaultIcon={<MdOutlineNotifications />}
            selectedIcon={<MdNotifications />}
            text={language === "kor" ? "알림" : "Notification"}
            selected={section === "notification"}
            onClick={() => setSection("notification")}
          ></SectionItem>
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
