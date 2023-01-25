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

const Container = styled.div`
  width: 100%;
  padding: 1em;

  display: flex;
  align-items: center;
  flex-direction: column;

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

export default function Records() {
  const clockColor = useRecoilValue(clockColorValueAtom);
  const [curNavSection, setCurNavSection] = useRecoilState(CFNS);

  const sectionComponents: Record<FlexableNavSectionType, ReactNode> = {
    overview: <RecordOverview />,
    logs: <RecordLogs />,
  };

  return (
    <Container>
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
  );
}
