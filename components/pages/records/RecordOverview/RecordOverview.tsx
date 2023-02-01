import { useQuery } from "@tanstack/react-query";
import {
  BEHAVIOR_DB_KEY,
  getBehaviorFromDB,
  getTimeRecordsFromDB,
  TIME_RECORD_DB_KEY,
} from "../../../../hooks/useIDB";
import Behavior from "./contents/Behavior/Behavior";
import Graph from "./contents/Graph/Graph";
import TotalTime from "./contents/TotalTime/TotalTime";

export default function RecordOverview() {
  const { isLoading: isBehaviorLoading, data: behaviorData } = useQuery(
    [BEHAVIOR_DB_KEY],
    getBehaviorFromDB
  );
  const { isLoading: isTimeRecordsLoading, data: timeRecordsData } = useQuery(
    [TIME_RECORD_DB_KEY],
    getTimeRecordsFromDB
  );

  const isLoading = () => {
    return (
      isBehaviorLoading ||
      isTimeRecordsLoading ||
      behaviorData === undefined ||
      timeRecordsData === undefined
    );
  };

  if (isLoading()) return null;
  return (
    <>
      <TotalTime timeRecordsData={timeRecordsData!} />
      <Graph timeRecordsData={timeRecordsData!} />
      <Behavior behaviorData={behaviorData!} />
    </>
  );
}
