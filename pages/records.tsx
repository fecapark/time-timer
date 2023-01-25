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
  clockColorValueAtom,
  currentFlexableNavSectionAtom as CFNS,
} from "../shared/atom";
import { Logo } from "../components/Intro/Intro.styled";
import RecordOverview from "../components/Record/RecordOverview/RecordOverview";
import RecordLogs from "../components/Record/RecordLogs/RecordLogs";
import Link from "next/link";
import { IoMdTime } from "react-icons/io";
import { darken } from "polished";

const Container = styled.div`
  width: 100%;
  padding: 1em;

  display: flex;
  align-items: center;
  flex-direction: column;

  .flexable {
    width: 100%;
    height: 250px;

    display: flex;
    gap: 8px;

    .go-home {
      width: 60px;
      height: 100%;
      background-color: ${({ theme }) => theme.background.secondary};
      border-radius: 24px;

      &:hover {
        width: 90px;
      }
    }

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

const GoHomeButtonContainer = styled.div<{ color: string }>`
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
`;

export default function Records() {
  const clockColor = useRecoilValue(clockColorValueAtom);
  const [curNavSection, setCurNavSection] = useRecoilState(CFNS);

  const sectionComponents: Record<FlexableNavSectionType, ReactNode> = {
    overview: <RecordOverview />,
    logs: <RecordLogs />,
  };

  return (
    <>
      <Container>
        <div className="flexable">
          <FlexableNav>
            <FlexableNavItem
              position="left"
              title="Overview"
              description="Gather your time records at a glance."
              activeColor={`${Theme.clock.color[clockColor]}99`}
              isFlexed={curNavSection === "logs"}
              flexedIcon={<MdViewQuilt />}
              onFlexedClick={() => {
                setCurNavSection("overview");
              }}
            />
            <FlexableNavItem
              position="right"
              title="Logs"
              description="Watch your records as a timeline."
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
      <Link
        href="/"
        style={{
          textDecoration: "none",
          WebkitTapHighlightColor: "transparent",
        }}
      >
        <GoHomeButtonContainer color={`${Theme.clock.color[clockColor]}`}>
          <div className="bg-filter"></div>
          <div className="icon-wrapper">
            <IoMdTime />
          </div>
        </GoHomeButtonContainer>
      </Link>
    </>
  );
}
