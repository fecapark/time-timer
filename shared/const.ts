import {
  ClockColorType,
  ClockTimeUnitType,
  IBehaviorDataType,
  IOptionDataType,
  LanguageOptionType,
  MaxClockTimeType,
  ProgressUnitType,
} from "./types";

export const maxClockTimes = [10, 30, 60, 120, 240, 360, 720] as const;

export const clockTimeUnits = [1, 5, 10, 15, 30, 60, 300, 600] as const;

export const audioFileName = "attention-bell";

export const optionKey = "14SDV124018ASFEGSFBSA";

export const maxClockTimeDefaultValue: MaxClockTimeType = 60;

export const clockTimeUnitDefaultValue: ClockTimeUnitType = 15;

export const progressUnitDefaultValue: ProgressUnitType = "time";

export const languageOptionDefaultValue: LanguageOptionType = "en";

export const clockColorDefaultValue: ClockColorType = "red";

export const optionDefaultValue: IOptionDataType = {
  language: languageOptionDefaultValue,
  clockColor: clockColorDefaultValue,
  progressUnit: progressUnitDefaultValue,
  maxClockTime: maxClockTimeDefaultValue,
  clockTimeUnit: clockTimeUnitDefaultValue,
};

export const behaviorDefaultValue: IBehaviorDataType = {
  finishBehavior: {
    pauseCount: 0,
    wholeCount: 0,
  },
  daysInARow: {
    maximumDays: 0,
    currentDays: 0,
    recentDate: null,
  },
  longestDuration: 0,
};
