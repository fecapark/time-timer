import styled from "@emotion/styled";
import { MdFormatListBulleted, MdOpenInNew, MdViewQuilt } from "react-icons/md";
import FlexableNav, {
  FlexableNavItem,
} from "../components/FlexableNav/FlexableNav";
import { Theme } from "../styles/theme";
import { FlexableNavSectionType } from "../shared/types";
import { ReactNode } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  languageOptionValueAtom as LOV,
  clockColorValueAtom as CCV,
  currentFlexableNavSectionAtom as CFNS,
  onFlexableNavTransitionAtom as OFNT,
} from "../shared/atom";
import { Logo } from "../components/Intro/Intro.styled";
import RecordOverview from "../components/Record/RecordOverview/RecordOverview";
import RecordLogs from "../components/Record/RecordLogs/RecordLogs";
import Link from "next/link";
import { IoMdTime } from "react-icons/io";
import { darken } from "polished";
import ConditionalLink from "../components/Button/ConditionalLink/ConditionalLink";
import Seo from "../components/SEO/Seo";

const Container = styled.div`
  width: 100%;
  padding: 1em;

  display: flex;
  align-items: center;
  flex-direction: column;

  .flexable {
    max-width: 1760px;
    width: 100%;
    height: 250px;

    @media screen and (min-width: 799px) {
      height: 450px;
    }

    @media screen and (min-width: 1269px) {
      height: 550px;
    }
  }

  footer {
    width: 99%;
    height: 240px;

    border-top: 2px solid ${({ theme }) => theme.background.secondary};

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;

    .copyright {
      font-size: 12px;
      color: #a0a0a0;
    }

    .links {
      margin-top: 12px;
      display: flex;
      gap: 16px;

      a {
        display: flex;
        gap: 4px;
        align-items: center;

        color: #a0a0a0;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    @media screen and (min-width: 768px) {
      height: 360px;
    }
  }
`;

const PaddingAroundedContainer = styled.div`
  font-size: 14px;

  width: 100%;
  max-width: 800px;
  min-height: calc(100vh - 250px - 9em);

  padding: 0 1em;

  display: flex;
  flex-direction: column;

  margin-top: 8em;

  @media screen and (min-width: 799px) {
    min-height: calc(100vh - 450px - 9em);
  }

  @media screen and (min-width: 1269px) {
    min-height: calc(100vh - 550px - 9em);
  }
`;

const GoHomeButtonContainer = styled.button<{ color: string }>`
  font-size: 48px;

  position: fixed;
  right: 0.8em;
  bottom: 1.2em;

  padding: 0.6em;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50%;
  overflow: hidden;
  background-color: ${(props) => darken(0.15, props.color)};

  cursor: pointer;

  .icon-wrapper {
    display: inline-flex;
    justify-content: center;
    align-items: center;

    text-decoration: none;
    -webkit-tap-highlight-color: transparent;

    svg {
      color: #eaf4f0;
      font-size: 1em;
      line-height: 1em;
      color: white;
    }
  }

  @media screen and (max-width: 768px) {
    font-size: 42px;
    right: 0.72em;
    bottom: 1.1em;
  }

  @media screen and (max-width: 500px) {
    font-size: 36px;
    right: 0.65em;
    bottom: 1em;
  }
`;

export default function Records() {
  const language = useRecoilValue(LOV);
  const clockColor = useRecoilValue(CCV);
  const isFlexableNavTransitioning = useRecoilValue(OFNT);
  const [curNavSection, setCurNavSection] = useRecoilState(CFNS);

  const sectionComponents: Record<FlexableNavSectionType, ReactNode> = {
    overview: <RecordOverview />,
    logs: <RecordLogs />,
  };

  return (
    <>
      <Seo
        title="Records | 타임 타이머"
        description="60분 온라인 타이머를 사용해서 최고의 집중을 만들어보세요."
      />
      <Container>
        <div className="flexable">
          <FlexableNav>
            <FlexableNavItem
              position="left"
              title={language === "kor" ? "개요" : "Overview"}
              description={
                language === "kor"
                  ? "한 눈에 기록된 시간들을 모아보세요."
                  : "Gather your time records at a glance."
              }
              activeColor={`${Theme.clock.color[clockColor]}99`}
              isFlexed={curNavSection === "logs"}
              flexedIcon={<MdViewQuilt />}
              onFlexedClick={() => {
                setCurNavSection("overview");
              }}
            />
            <FlexableNavItem
              position="right"
              title={language === "kor" ? "기록" : "Logs"}
              description={
                language === "kor"
                  ? "기록된 시간들을 시간순으로 나열했어요."
                  : "Watch your records as a timeline."
              }
              activeColor={`${Theme.clock.color[clockColor]}99`}
              isFlexed={curNavSection === "overview"}
              flexedIcon={<MdFormatListBulleted />}
              onFlexedClick={() => {
                setCurNavSection("logs");
              }}
            />
          </FlexableNav>
        </div>
        <PaddingAroundedContainer>
          {sectionComponents[curNavSection]}
        </PaddingAroundedContainer>
        <footer>
          <Logo
            size={14}
            hide={false}
            style={{ filter: "brightness(0.94)", flexDirection: "row" }}
          >
            <div className="word">Time</div>
            <div className="word bottom">Timer</div>
          </Logo>
          <span className="copyright">
            Copyright &copy; 2022 Sanghyeok Park. All rights reserved.
          </span>
          <div className="links">
            <a
              href="https://github.com/fecapark/time-timer"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Github</span>
              <MdOpenInNew />
            </a>
            <a
              href="https://www.timetimer.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>About Time Timer</span>
              <MdOpenInNew />
            </a>
          </div>
        </footer>
      </Container>
      <ConditionalLink href="/" disabled={isFlexableNavTransitioning}>
        <GoHomeButtonContainer
          color={`${Theme.clock.color[clockColor]}`}
          disabled={isFlexableNavTransitioning}
        >
          <div className="bg-filter"></div>
          <div className="icon-wrapper">
            <IoMdTime />
          </div>
        </GoHomeButtonContainer>
      </ConditionalLink>
    </>
  );
}
