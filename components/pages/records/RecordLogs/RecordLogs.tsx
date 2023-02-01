import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import {
  getTimeRecordsFromDB,
  TIME_RECORD_DB_KEY,
} from "../../../../hooks/useIDB";
import { clockColorValueAtom as CCV } from "../../../../shared/atom";
import { ITimeRecordDataType } from "../../../../shared/types";
import { Theme } from "../../../../styles/theme";
import { getDayGapBetween } from "../../../../utils/time";
import NoLog from "./NoLog/NoLog";
import RecordCard from "./RecordCard/RecordCard";
import { CardBox } from "./RecordLogs.styled";

export default function RecordLogs() {
  const clockColor = useRecoilValue(CCV);

  const { isLoading, data: timeRecordDatas } = useQuery(
    [TIME_RECORD_DB_KEY],
    getTimeRecordsFromDB
  );

  const isLoadingData = isLoading || timeRecordDatas === undefined;
  const isDataEmpty =
    timeRecordDatas === undefined || timeRecordDatas.length === 0;

  const groupingRecordsBySameDate = () => {
    if (isLoadingData || isDataEmpty) return [];

    let curDate: Date = timeRecordDatas![0].endTime;
    let curRes: ITimeRecordDataType[] = [timeRecordDatas![0]];
    const res: Array<typeof curRes> = [];

    timeRecordDatas!.slice(1).forEach((aRecord) => {
      if (getDayGapBetween(curDate, aRecord.endTime) === 0) {
        curRes.push(aRecord);
        return;
      }

      res.push(curRes);
      curRes = [aRecord];
      curDate = aRecord.endTime;
    });

    if (curRes.length > 0) res.push(curRes);
    return res;
  };

  const cards = useMemo(() => {
    const groupedRecords = groupingRecordsBySameDate();
    return groupedRecords.map((aDayRecords, i) => {
      if (aDayRecords.length === 0) return null;
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
      {isLoadingData ? null : isDataEmpty ? (
        <NoLog />
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
