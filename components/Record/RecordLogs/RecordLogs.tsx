import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { FaBoxOpen } from "react-icons/fa";
import { useRecoilValue } from "recoil";
import {
  getTimeRecordsFromDB,
  TIME_RECORD_DB_KEY,
} from "../../../hooks/useIDB";
import { clockColorValueAtom } from "../../../shared/atom";
import { ITimeRecordDataType } from "../../../shared/types";
import { Theme } from "../../../styles/theme";
import { getDayGapBetween } from "../../../utils/time";
import { RiFlag2Fill } from "react-icons/ri";
import { IRecordCardProps } from "./RecordLogs.type";
import { CardBox, CardContainer, NoLogContainer } from "./RecordLogs.styled";

function RecordCard({
  duration,
  endTime,
  paused,
  completeRatio,
}: IRecordCardProps) {
  const clockColor = useRecoilValue(clockColorValueAtom);

  const getMinSec = () => {
    const min = Math.floor(duration / 1000 / 60).toString();
    const sec = (Math.floor(duration / 1000) % 60).toString();

    return {
      min: min.length < 2 ? `0${min}` : min,
      sec: sec.length < 2 ? `0${sec}` : sec,
    };
  };

  const getCompletePercentage = () => {
    return (Math.floor(completeRatio * 1000) / 10).toFixed(1);
  };

  const getHowMuchDateAgo = () => {
    const dayGap = getDayGapBetween(new Date(), endTime);

    if (dayGap === 0) return "Today";
    if (dayGap < 7) return `${dayGap}d ago`;
    if (dayGap < 30) return `${Math.floor(dayGap / 7)}w ago`;
    if (dayGap < 365) return `${Math.floor(dayGap / 30)}m ago`;
    return `${Math.floor(dayGap / 365)}y ago`;
  };

  const getDateString = () => {
    const monthName = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${
      monthName[endTime.getMonth()]
    } ${endTime.getDate()}, ${endTime.getFullYear()}`;
  };

  return (
    <CardContainer accentColor={`${Theme.clock.color[clockColor]}`}>
      <div className="time-displayer">
        <div className="min">{getMinSec().min}</div>
        <div className="hr"></div>
        <div className="sec">{getMinSec().sec}</div>
      </div>
      <div className="info-container">
        <div className="date-info">
          <span className="date-ago">{getHowMuchDateAgo()}</span>
          <span className="full-date">{getDateString()}</span>
        </div>
        <div className="pause-info">
          {paused ? (
            <div className="percentage">{getCompletePercentage()}</div>
          ) : (
            <div className="goal">
              <RiFlag2Fill />
            </div>
          )}
        </div>
      </div>
    </CardContainer>
  );
}

export default function RecordLogs() {
  const clockColor = useRecoilValue(clockColorValueAtom);

  /*
    Queries
  */
  const { isLoading: isTimeRecordsLoading, data: timeRecordDatas } = useQuery(
    [TIME_RECORD_DB_KEY],
    getTimeRecordsFromDB
  );

  /*
    Memos
  */

  const cards = useMemo(() => {
    if (isTimeRecordsLoading || timeRecordDatas === undefined) return;

    let curRes: ITimeRecordDataType[] = [];
    const res: Array<typeof curRes> = [];

    let curDate: Date | null = null;
    timeRecordDatas.forEach((aRecord) => {
      if (curDate === null) {
        curRes.push(aRecord);
        curDate = aRecord.endTime;
        return;
      }

      if (getDayGapBetween(curDate, aRecord.endTime) === 0) {
        curRes.push(aRecord);
      } else {
        res.push(curRes);
        curRes = [aRecord];
        curDate = aRecord.endTime;
      }
    });
    res.push(curRes);

    return res.map((aDayRecords) => {
      return (
        <div className="same-day-container">
          {aDayRecords.map((aRecord) => {
            return (
              <RecordCard
                duration={aRecord.duration}
                endTime={aRecord.endTime}
                paused={aRecord.finishedByPaused}
                completeRatio={aRecord.completeRatio}
              />
            );
          })}
        </div>
      );
    });
  }, [timeRecordDatas]);

  return (
    <>
      {isTimeRecordsLoading ||
      timeRecordDatas === undefined ? null : timeRecordDatas.length === 0 ? (
        <NoLogContainer>
          <FaBoxOpen />
          <div>
            <span className="title">EMPTY</span>
            <span className="description">
              Start the timer over 10 minutes first.
            </span>
          </div>
        </NoLogContainer>
      ) : (
        <>
          <CardBox borderColor={`${Theme.clock.color[clockColor]}bb`}>
            {cards}
          </CardBox>
          <div style={{ height: "16em" }}></div>
        </>
      )}
    </>
  );
}
