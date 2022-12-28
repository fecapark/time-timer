import styled from "@emotion/styled";
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
  activedMenuSectionAtom as AMS,
} from "../../../shared/atom";
import { Theme } from "../../../styles/theme";
import useModal from "../../../hooks/useModal";
import SupportingInfoModal from "../../Modal/contents/SupportingInfoModal/SupportingInfoModal";
import PreviewSoundModal from "../../Modal/contents/PreviewSoundModal/PreviewSoundModal";
import useMediaMatch from "../../../hooks/useMediaMatch";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  height: 100%;
`;

const MainMenuBar = styled.div`
  position: relative;
  background-color: #29292b;

  padding: 28px 0;
  height: 100%;

  .section {
    margin-bottom: 56px;
  }
`;

const SliderContainer = styled.div<{ active: boolean }>`
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
      props.active
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

const ItemContainer = styled.div<{ active: boolean }>`
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

const OpenLinkItemContainer = styled(ItemContainer)`
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

const SliderItemContainer = styled.div`
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

const ColorThumbnail = styled.div<{ color: string }>`
  width: 20px;
  height: 20px;

  border-radius: 4px;

  background-color: ${(props) => props.color};
`;

interface IItemProps {
  icon: React.ReactNode;
  text: string;
  selected?: boolean;
  onClick?: () => void;
}

interface IOpenLinkItemProps {
  icon: React.ReactNode;
  text: string;
  href: string;
}

interface ISliderItemProps {
  content: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
}

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
  const setSection = useSetRecoilState(AMS);
  const [isSliderActive, setIsSliderActive] = useRecoilState(ISA);
  const [isHideTimer] = useMediaMatch(Theme.mediaQueries.hideTimerMaxWidth);

  const closeSlider = () => {
    setSection(null);
    setIsSliderActive(false);
  };

  useEffect(() => {
    closeSlider();
  }, [isHideTimer]);

  return (
    <SliderContainer active={isSliderActive}>
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
  const [section, setSection] = useRecoilState(AMS);
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
    <Container>
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
