import {
  MdKeyboardArrowLeft,
  MdOpenInNew,
  MdOutlineNotifications,
  MdOutlinePalette,
  MdTranslate,
} from "react-icons/md";
import { BsGithub } from "react-icons/bs";
import React, { useEffect, useState } from "react";
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
  MenuSectionType,
} from "./FixedMenu.type";

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

function Slider({ selector }: { selector: () => React.ReactNode }) {
  const isClockPointerDown = useRecoilValue(ICPD);
  const isTimingNow = useRecoilValue(ITN);
  const [isSliderActive, setIsSliderActive] = useRecoilState(ISA);
  const [isHideTimer] = useMediaMatch(Theme.mediaQueries.hideTimerMaxWidth);

  const closeSlider = () => {
    setIsSliderActive(false);
  };

  useEffect(() => {
    closeSlider();
  }, [isHideTimer]);

  useEffect(() => {
    if (!isClockPointerDown && !isTimingNow) return;
    closeSlider();
  }, [isClockPointerDown, isTimingNow]);

  return (
    <SliderContainer
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
  icon,
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
      <div className="icon-wrapper">{icon}</div>
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

  const LangSection = (
    <>
      <SliderItem
        content="한국어"
        selected={language === "kor"}
        onClick={() => {
          setLanguage("kor");
        }}
      />
      <SliderItem
        content="English"
        selected={language === "en"}
        onClick={() => {
          setLanguage("en");
        }}
      />
    </>
  );

  const ColorSection = (
    <>
      <SliderItem
        content={<ColorThumbnail color={Theme.clock.color.red} />}
        selected={clockColor === "red"}
        onClick={() => {
          setClockColor("red");
        }}
      />
      <SliderItem
        content={<ColorThumbnail color={Theme.clock.color.blue} />}
        selected={clockColor === "blue"}
        onClick={() => {
          setClockColor("blue");
        }}
      />
      <SliderItem
        content={<ColorThumbnail color={Theme.clock.color.yellow} />}
        selected={clockColor === "yellow"}
        onClick={() => {
          setClockColor("yellow");
        }}
      />
    </>
  );

  const NotificationSection = (
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
  );

  const sliderContentSelector = () => {
    if (section === "language") return LangSection;
    if (section === "color") return ColorSection;
    if (section === "notification") return NotificationSection;
    return null;
  };

  return (
    <Container triggerHide={isClockPointerDown || isTimingNow}>
      <Slider selector={sliderContentSelector} />
      <MainMenuBar>
        <div className="section">
          <Item
            icon={<MdTranslate />}
            text={language === "kor" ? "언어" : "Language"}
            selected={section === "language"}
            onClick={() => setSection("language")}
          />
          <Item
            icon={<MdOutlinePalette />}
            text={language === "kor" ? "색상" : "Color"}
            selected={section === "color"}
            onClick={() => setSection("color")}
          ></Item>
          <Item
            icon={<MdOutlineNotifications />}
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
