import styled from "@emotion/styled";
import { MdFormatListBulleted, MdOpenInNew, MdViewQuilt } from "react-icons/md";
import GrassGraph from "../components/GrassGraph/GrassGraph";
import FlexableNav, {
  FlexableNavItem,
} from "../components/FlexableNav/FlexableNav";
import { Theme } from "../styles/theme";
import { ClockColorType } from "../shared/types";
import { useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  clockColorValueAtom,
  currentFlexableNavSectionAtom as CFNS,
} from "../shared/atom";
import {
  BEHAVIOR_DB_KEY,
  getBehaviorFromDB,
  getTimeRecordsFromDB,
  TIME_RECORD_DB_KEY,
} from "../hooks/useIDB";
import { useQuery } from "@tanstack/react-query";
import { getDayGapBetween } from "../utils/time";
import { Logo } from "../components/Intro/Intro.styled";

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

  footer {
    margin-top: 16em;
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

  /*
    Queries
  */
  const { isLoading: isBehaviorLoading, data: behaviorData } = useQuery(
    [BEHAVIOR_DB_KEY],
    getBehaviorFromDB
  );
  const { isLoading: isTimeRecordsLoading, data: timeRecordDatas } = useQuery(
    [TIME_RECORD_DB_KEY],
    getTimeRecordsFromDB
  );

  /*
    Memos
  */
  const durationSums = useMemo(() => {
    function parseMSToH(ms: number) {
      return ms / 1000 / 60 / 60;
    }

    if (timeRecordDatas === undefined || isTimeRecordsLoading)
      return {
        today: null,
        week: null,
        month: null,
        all: null,
      };

    const durationSums = {
      today: 0,
      week: 0,
      month: 0,
      all: 0,
    };

    const now = new Date();
    timeRecordDatas.forEach((aRecord) => {
      const dayGapWithRecord = getDayGapBetween(aRecord.endTime, now);

      durationSums.all += aRecord.duration;

      if (dayGapWithRecord < 30) {
        durationSums.month += aRecord.duration;
      }

      if (dayGapWithRecord < 7) {
        durationSums.week += aRecord.duration;
      }

      if (dayGapWithRecord === 0) {
        durationSums.today += aRecord.duration;
      }
    });

    return {
      today: splitIntAndFloatPartWithFixed(parseMSToH(durationSums.today), 1),
      week: splitIntAndFloatPartWithFixed(parseMSToH(durationSums.week), 1),
      month: splitIntAndFloatPartWithFixed(parseMSToH(durationSums.month), 1),
      all: splitIntAndFloatPartWithFixed(parseMSToH(durationSums.all), 1),
    };
  }, [timeRecordDatas, isTimeRecordsLoading]);

  const timeValues = useMemo(() => {
    function parseMSToMin(ms: number) {
      return ms / 1000 / 60;
    }

    if (timeRecordDatas === undefined || isTimeRecordsLoading) return [];

    const res: number[] = [];
    let currentDate = new Date();
    timeRecordDatas.forEach((aRecord) => {
      const dayGapWithCurrentDate = getDayGapBetween(
        currentDate,
        aRecord.endTime
      );

      for (let i = 0; i < dayGapWithCurrentDate; i++) {
        res.push(0);
      }

      if (res.length === 0) {
        res.push(parseMSToMin(aRecord.duration));
      } else {
        res[res.length - 1] += parseMSToMin(aRecord.duration);
      }

      currentDate = aRecord.endTime;
    });

    return res;
  }, [timeRecordDatas, isTimeRecordsLoading]);

  /*
    Functions
  */

  function splitIntAndFloatPartWithFixed(num: number, fixed: number = 1) {
    const fixedNum = num.toFixed(fixed);

    return {
      int: fixedNum.slice(0, fixedNum.length - (fixed + 1)),
      float: fixedNum.slice(fixedNum.length - (fixed + 1), fixedNum.length),
    };
  }

  const getPausePercentage = () => {
    if (behaviorData === undefined || isBehaviorLoading) return null;

    const { pauseCount, wholeCount } = behaviorData.finishBehavior;
    if (wholeCount === 0) return "0";

    const ratio = 1 - pauseCount / wholeCount;
    const percentage = Math.floor(ratio * 100).toString();

    return percentage;
  };

  const getMaximumRowDays = () => {
    if (behaviorData === undefined || isBehaviorLoading) return null;
    return behaviorData.daysInARow.maximumDays.toString();
  };

  const getLongestTimingDuration = () => {
    if (behaviorData === undefined || isBehaviorLoading) return null;
    const hour = behaviorData.longestDuration / 1000 / 60 / 60;
    return splitIntAndFloatPartWithFixed(hour, 1);
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
                <span className="big">{durationSums.today?.int}</span>
                <span className="mid">{durationSums.today?.float}</span>
                <span className="small">H</span>
              </ValueDisplayer>
              <ValueInfo>For today</ValueInfo>
            </ValueItem>
            <ValueItem>
              <ValueDisplayer testColor={clockColor}>
                <span className="big">{durationSums.week?.int}</span>
                <span className="mid">{durationSums.week?.float}</span>
                <span className="small">H</span>
              </ValueDisplayer>
              <ValueInfo>For a week</ValueInfo>
            </ValueItem>
            <ValueItem>
              <ValueDisplayer testColor={clockColor}>
                <span className="big">{durationSums.month?.int}</span>
                <span className="mid">{durationSums.month?.float}</span>
                <span className="small">H</span>
              </ValueDisplayer>
              <ValueInfo>For a month</ValueInfo>
            </ValueItem>
            <ValueItem>
              <ValueDisplayer testColor={clockColor}>
                <span className="big">{durationSums.all?.int}</span>
                <span className="mid">{durationSums.all?.float}</span>
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
          <GrassGraph
            recentDatas={timeValues}
            color={Theme.clock.color[clockColor]}
            colorBoundary={[10, 30, 60, 120]}
          />
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
