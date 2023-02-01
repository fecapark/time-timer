import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import {
  getTimeRecordsFromDB,
  TIME_RECORD_DB_KEY,
} from "../../../../hooks/useIDB";
import { ITimeRecordDataType } from "../../../../shared/types";
import { getDayGapBetween } from "../../../../utils/time";
import NoLog from "./NoLog/NoLog";
import { CardBox } from "./RecordLogs.styled";
import SameDayContainer from "./SameDayContainer/SameDayContainer";

export default function RecordLogs() {
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
      return <SameDayContainer key={i} dayRecords={aDayRecords} />;
    });
  }, [timeRecordDatas]);

  return (
    <>
      {isLoadingData ? null : isDataEmpty ? (
        <NoLog />
      ) : (
        <>
          <CardBox>{cards}</CardBox>
          <div style={{ height: "16em" }}></div>
        </>
      )}
    </>
  );
}
