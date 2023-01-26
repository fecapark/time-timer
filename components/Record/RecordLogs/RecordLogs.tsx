import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { FaBoxOpen } from "react-icons/fa";
import { useRecoilValue } from "recoil";
import {
  getTimeRecordsFromDB,
  TIME_RECORD_DB_KEY,
} from "../../../hooks/useIDB";
import {
  clockColorValueAtom as CCV,
  languageOptionValueAtom as LOV,
} from "../../../shared/atom";
import { ITimeRecordDataType, LanguageOptionType } from "../../../shared/types";
import { Theme } from "../../../styles/theme";
import { getDayGapBetween } from "../../../utils/time";
import { RiFlag2Fill } from "react-icons/ri";
import { IRecordCardProps } from "./RecordLogs.type";
import { CardBox, CardContainer, NoLogContainer } from "./RecordLogs.styled";
import { MdCalendarToday } from "react-icons/md";

const getDateString = (time: Date, language: LanguageOptionType) => {
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

  if (language === "kor")
    return `${time.getFullYear()}년 ${
      time.getMonth() + 1
    }월 ${time.getDate()}일`;

  return `${
    monthName[time.getMonth()]
  } ${time.getDate()}, ${time.getFullYear()}`;
};

function RecordCard({
  duration,
  endTime,
  paused,
  completeRatio,
}: IRecordCardProps) {
  const language = useRecoilValue(LOV);
  const clockColor = useRecoilValue(CCV);

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

    if (dayGap === 0) return language === "kor" ? "오늘" : "Today";
    if (dayGap < 7)
      return language === "kor" ? `${dayGap}일 전` : `${dayGap}d ago`;
    if (dayGap < 30)
      return language === "kor"
        ? `${Math.floor(dayGap / 7)}주 전`
        : `${Math.floor(dayGap / 7)}w ago`;
    if (dayGap < 365)
      return language === "kor"
        ? `${Math.floor(dayGap / 30)}달 전`
        : `${Math.floor(dayGap / 30)}m ago`;
    return language === "kor"
      ? `${Math.floor(dayGap / 365)}년 전`
      : `${Math.floor(dayGap / 365)}y ago`;
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
          <span className="full-date">{getDateString(endTime, language)}</span>
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
  const language = useRecoilValue(LOV);
  const clockColor = useRecoilValue(CCV);

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

    return res.map((aDayRecords, i) => {
      if (aDayRecords.length === 0) return null;

      function durationToTime(duration: number) {
        const hour = Math.floor(duration / 1000 / 60 / 60);
        const min = Math.floor(duration / 1000 / 60) % 60;
        const sec = Math.floor(duration / 1000) % 60;

        if (language === "kor") {
          if (hour === 0 && min === 0) return `${sec}초`;
          if (hour === 0) return `${min}분 ${sec}초`;
          return `${hour}시간 ${min}분 ${sec}초`;
        }

        if (hour === 0 && min === 0) return `${sec}s`;
        if (hour === 0) return `${min}m ${sec}s`;
        return `${hour}h ${min}m ${sec}s`;
      }

      const total = aDayRecords.reduce((acc, cur) => {
        return acc + cur.duration;
      }, 0);

      return (
        <div className="same-day-container" key={i}>
          <div className="card-container">
            {aDayRecords.map((aRecord, j) => {
              return (
                <RecordCard
                  key={`${i}_${j}`}
                  duration={aRecord.duration}
                  endTime={aRecord.endTime}
                  paused={aRecord.finishedByPaused}
                  completeRatio={aRecord.completeRatio}
                />
              );
            })}
          </div>
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
            <span
              className="title"
              style={{ letterSpacing: language === "kor" ? "0" : "1.5px" }}
            >
              {language === "kor" ? "비어있음" : "EMPTY"}
            </span>
            <span className="description">
              {language === "kor"
                ? "먼저 타이머를 시작해 10분 이상의 시간을 기록해보세요."
                : "Start the timer over 10 minutes first."}
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
