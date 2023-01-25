import { useMutation } from "@tanstack/react-query";
import { ITimeRecordDataType } from "../shared/types";
import { isTomorrow } from "../utils/time";
import {
  BEHAVIOR_DB_KEY,
  setBehaviorToDB,
  setTimeRecordsToDB,
  TIME_RECORD_DB_KEY,
} from "./useIDB";

interface IBehaviorPayload {
  isPausedBefore: boolean;
  endTime: Date;
  timingDuration: number;
}

interface ITimeRecordPayload {
  isPausedBefore: boolean;
  startTime: Date;
  endTime: Date;
  timingDuration: number;
  completeRatio: number;
}

export default function useRecordManager() {
  const { mutate: mutateBehavior } = useMutation(
    [BEHAVIOR_DB_KEY],
    setBehaviorToDB
  );

  const { mutate: mutateTimeRecords } = useMutation(
    [TIME_RECORD_DB_KEY],
    setTimeRecordsToDB
  );

  const behavior = ({
    isPausedBefore,
    endTime,
    timingDuration,
  }: IBehaviorPayload) => {
    mutateBehavior((prev) => {
      let res = prev;

      res.finishBehavior.wholeCount += 1;
      res.finishBehavior.pauseCount += isPausedBefore ? 1 : 0;

      if (res.daysInARow.recentDate === null) {
        res.daysInARow.currentDays = 1;
      } else if (isTomorrow(res.daysInARow.recentDate, endTime)) {
        res.daysInARow.currentDays += 1;
      } else {
        res.daysInARow.currentDays = 1;
      }

      res.daysInARow.maximumDays = Math.max(
        res.daysInARow.currentDays,
        res.daysInARow.maximumDays
      );
      res.daysInARow.recentDate = endTime;
      res.longestDuration = Math.max(res.longestDuration, timingDuration);

      return res;
    });
  };

  const timeRecords = ({
    timingDuration,
    startTime,
    endTime,
    isPausedBefore,
    completeRatio,
  }: ITimeRecordPayload) => {
    mutateTimeRecords((prev) => {
      const res: ITimeRecordDataType = {
        duration: timingDuration,
        startTime,
        endTime,
        finishedByPaused: isPausedBefore,
        completeRatio,
      };
      return [res, ...prev];
    });
  };

  return { manageBehavior: behavior, manageTimeRecords: timeRecords };
}
