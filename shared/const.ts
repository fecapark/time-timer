import {
  ClockColorType,
  ClockTimeUnitType,
  IBehaviorDataType,
  IOptionDataType,
  ITimeRecordDataType,
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

export const timeRecordsDefaultValue: Array<ITimeRecordDataType> = [
  // {
  //   duration: 30 * 60 * 60 * 1000,
  //   startTime: new Date(2023, 0, 23),
  //   endTime: new Date(2023, 0, 23),
  // },
  // {
  //   duration: 12 * 60 * 60 * 1000,
  //   startTime: new Date(2023, 0, 23),
  //   endTime: new Date(2023, 0, 23),
  // },
  // {
  //   duration: 59 * 60 * 60 * 1000,
  //   startTime: new Date(2023, 0, 22),
  //   endTime: new Date(2023, 0, 22),
  // },
  // {
  //   duration: 18 * 60 * 60 * 1000,
  //   startTime: new Date(2023, 0, 18),
  //   endTime: new Date(2023, 0, 18),
  // },
  // {
  //   duration: 300 * 60 * 60 * 1000,
  //   startTime: new Date(2023, 0, 16),
  //   endTime: new Date(2023, 0, 16),
  // },
  // {
  //   duration: 450 * 60 * 60 * 1000,
  //   startTime: new Date(2022, 11, 20),
  //   endTime: new Date(2022, 11, 20),
  // },
  // {
  //   duration: 100 * 60 * 60 * 1000,
  //   startTime: new Date(2022, 8, 3),
  //   endTime: new Date(2022, 8, 3),
  // },
  // {
  //   duration: 1000 * 60 * 60 * 1000,
  //   startTime: new Date(2022, 1, 23),
  //   endTime: new Date(2022, 1, 23),
  // },
];
