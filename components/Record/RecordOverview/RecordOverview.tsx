import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import {
  BEHAVIOR_DB_KEY,
  getBehaviorFromDB,
  getTimeRecordsFromDB,
  TIME_RECORD_DB_KEY,
} from "../../../hooks/useIDB";
import { clockColorValueAtom } from "../../../shared/atom";
import { Theme } from "../../../styles/theme";
import { getDayGapBetween } from "../../../utils/time";
import GrassGraph from "../../GrassGraph/GrassGraph";
import {
  ContentBody,
  ContentHeader,
  ContentSection,
  ValueDisplayer,
  ValueInfo,
  ValueItem,
} from "./RecordOverview.styled";

export default function RecordOverview() {
  const clockColor = useRecoilValue(clockColorValueAtom);

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

      if (dayGapWithCurrentDate >= 1) {
        for (
          let i = 0;
          i < dayGapWithCurrentDate - (res.length === 0 ? 0 : 1);
          i++
        ) {
          res.push(0);
        }
        res.push(parseMSToMin(aRecord.duration));
      } else {
        if (res.length === 0) {
          res.push(parseMSToMin(aRecord.duration));
        } else {
          res[res.length - 1] += parseMSToMin(aRecord.duration);
        }
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
    <>
      {isBehaviorLoading || isTimeRecordsLoading ? null : (
        <>
          <ContentSection>
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
          </ContentSection>
          <ContentSection>
            <ContentHeader>
              <h2>Time Table</h2>
              <h3>Visualize your recorded times per a day.</h3>
            </ContentHeader>
            <GrassGraph
              recentDatas={timeValues}
              color={Theme.clock.color[clockColor]}
              colorBoundary={[10, 30, 60, 120]}
            />
          </ContentSection>
          <ContentSection>
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
                  <span className="mid">
                    {getLongestTimingDuration()?.float}
                  </span>
                  <span className="small">H</span>
                </ValueDisplayer>
                <ValueInfo>Longest timing duration</ValueInfo>
              </ValueItem>
            </ContentBody>
          </ContentSection>
        </>
      )}
    </>
  );
}
