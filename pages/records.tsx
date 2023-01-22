import styled from "@emotion/styled";
import { MdFormatListBulleted, MdViewQuilt } from "react-icons/md";
import GrassGraph from "../components/GrassGraph/GrassGraph";
import FlexableNav, {
  FlexableNavItem,
} from "../components/FlexableNav/FlexableNav";
import { Theme } from "../styles/theme";
import { ClockColorType } from "../shared/types";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  clockColorValueAtom,
  currentFlexableNavSectionAtom as CFNS,
} from "../shared/atom";
import { BEHAVIOR_DB_KEY, getBehaviorFromDB } from "../hooks/useIDB";
import { useQuery } from "@tanstack/react-query";

interface IValueDisplayerStyleProps {
  inHead?: boolean;
  testColor: ClockColorType;
}

const Container = styled.div`
  width: 100%;
  padding: 1em;

  display: flex;
  align-items: center;
  flex-direction: column;
`;

const PaddingAroundedContainer = styled.section`
  font-size: 14px;

  width: 100%;
  max-width: 800px;
  padding: 0 1em;

  display: flex;
  flex-direction: column;
  gap: 16em;

  margin-top: 8em;
`;

const ContentHeader = styled.div`
  font-size: 1.45em;
  margin-bottom: 4.5em;

  h2 {
    font-family: ${({ theme }) => theme.font.family.raleway};
    font-size: 1.6em;
    line-height: 1.7em;
    font-weight: 600;
  }

  h3 {
    font-family: ${({ theme }) => theme.font.family.raleway};
    font-size: 0.85em;
    font-weight: 400;
    color: #e0e0e0;
  }

  @media screen and (min-width: 499px) {
    font-size: 1.7em;
  }

  @media screen and (min-width: 799px) {
    font-size: 2em;
  }
`;

const ContentBody = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 3em;

  @media screen and (min-width: 799px) {
    &[data-name="total-time"] {
      grid-template-columns: repeat(3, 1fr);
      gap: 0;
      row-gap: 5em;

      & > div[data-head="true"] {
        grid-column: 1 / 4;
      }
    }

    &[data-name="behavior"] {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;

const ValueItem = styled.div`
  font-size: 14px;
  font-family: ${({ theme }) => theme.font.family.poppins};

  &[data-head="true"] {
    font-size: 20px;
    margin-bottom: 2em;
  }
`;

const ValueDisplayer = styled.div<IValueDisplayerStyleProps>`
  span {
    line-height: calc(1em + 10px);
    font-weight: 400;
  }

  .big {
    font-size: 4em;
    line-height: calc(1em + 10px);
    color: ${(props) => props.theme.clock.color[props.testColor]};
  }

  .mid {
    font-size: 2em;
    color: ${(props) => props.theme.clock.color[props.testColor]};
  }

  .small {
    font-size: 1.3em;
    margin-left: 6px;
  }

  @media screen and (min-width: 799px) {
    ${(props) =>
      props.inHead
        ? `
      font-size: 1.4em;
      `
        : ""}
  }
`;

const ValueInfo = styled.span`
  font-size: 1.2em;
  line-height: 1.1em;

  font-weight: 300;
`;

export default function Records() {
  const clockColor = useRecoilValue(clockColorValueAtom);
  const [curNavSection, setCurNavSection] = useRecoilState(CFNS);

  const { isLoading, data } = useQuery([BEHAVIOR_DB_KEY], getBehaviorFromDB);

  const getPausePercentage = () => {
    if (data === undefined || isLoading) return null;

    const { pauseCount, wholeCount } = data.finishBehavior;
    if (wholeCount === 0) return "0";

    const ratio = 1 - pauseCount / wholeCount;
    const percentage = Math.floor(ratio * 100).toString();

    return percentage;
  };

  const getMaximumRowDays = () => {
    if (data === undefined || isLoading) return null;
    return data.daysInARow.maximumDays.toString();
  };

  const getLongestTimingDuration = () => {
    if (data === undefined || isLoading) return null;
    const hour = data.longestDuration / 1000 / 60 / 60;
    const fixedHourAtOne = hour.toFixed(1).toString();

    console.log(hour, fixedHourAtOne);

    return {
      int: fixedHourAtOne.slice(0, fixedHourAtOne.length - 2),
      float: fixedHourAtOne.slice(
        fixedHourAtOne.length - 2,
        fixedHourAtOne.length
      ),
    };
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
        <div>
          <ContentHeader>
            <h2>Total Time</h2>
            <h3>For only over 10 minutes records.</h3>
          </ContentHeader>
          <ContentBody data-name="total-time">
            <ValueItem data-head="true">
              <ValueDisplayer testColor={clockColor} inHead={true}>
                <span className="big">2.</span>
                <span className="mid">39</span>
                <span className="small">H</span>
              </ValueDisplayer>
              <ValueInfo>For today</ValueInfo>
            </ValueItem>
            <ValueItem>
              <ValueDisplayer testColor={clockColor}>
                <span className="big">127.</span>
                <span className="mid">21</span>
                <span className="small">H</span>
              </ValueDisplayer>
              <ValueInfo>For a week</ValueInfo>
            </ValueItem>
            <ValueItem>
              <ValueDisplayer testColor={clockColor}>
                <span className="big">474.</span>
                <span className="mid">03</span>
                <span className="small">H</span>
              </ValueDisplayer>
              <ValueInfo>For a month</ValueInfo>
            </ValueItem>
            <ValueItem>
              <ValueDisplayer testColor={clockColor}>
                <span className="big">1234.</span>
                <span className="mid">89</span>
                <span className="small">H</span>
              </ValueDisplayer>
              <ValueInfo>For whole days</ValueInfo>
            </ValueItem>
          </ContentBody>
        </div>
        <div>
          <ContentHeader>
            <h2>Time Table</h2>
            <h3>Visualize your recorded times per a day.</h3>
          </ContentHeader>
          <GrassGraph color={Theme.clock.color[clockColor]} />
        </div>
        <div>
          <ContentHeader>
            <h2>Behaviors</h2>
            <h3>We also collect your timing behaviors.</h3>
          </ContentHeader>
          <ContentBody data-name="behavior">
            <ValueItem>
              <ValueDisplayer testColor={clockColor}>
                <span className="big">{getPausePercentage()}</span>
                <span className="small">%</span>
              </ValueDisplayer>
              <ValueInfo>
                Finish timing
                <br />
                without pause
              </ValueInfo>
            </ValueItem>
            <ValueItem>
              <ValueDisplayer testColor={clockColor}>
                <span className="big">{getMaximumRowDays()}</span>
              </ValueDisplayer>
              <ValueInfo>
                Maximum days
                <br />
                in a row
              </ValueInfo>
            </ValueItem>
            <ValueItem>
              <ValueDisplayer testColor={clockColor}>
                <span className="big">{getLongestTimingDuration()?.int}</span>
                <span className="mid">{getLongestTimingDuration()?.float}</span>
                <span className="small">H</span>
              </ValueDisplayer>
              <ValueInfo>Longest timing duration</ValueInfo>
            </ValueItem>
          </ContentBody>
        </div>
      </PaddingAroundedContainer>
      <footer></footer>
    </Container>
  );
}
