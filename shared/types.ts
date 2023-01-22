import { Dispatch, SetStateAction } from "react";
import { Theme } from "../styles/theme";
import { clockTimeUnits, maxClockTimes } from "./const";

export interface IAudioData {
  name: string;
  src: string;
}

export interface IModalContentPayload {
  title: string;
  content: JSX.Element;
}

export interface IBottomSheetContentConstructorProp {
  hideBottomSheet: () => void;
}

export interface IOptionDataType {
  clockColor: ClockColorType;
  language: LanguageOptionType;
  progressUnit: ProgressUnitType;
  maxClockTime: MaxClockTimeType;
  clockTimeUnit: ClockTimeUnitType;
}

export interface ITimeRecordDataType {}

/*
  #1. Finish timing without pause
    a. 일시정지로 끝낸 횟수
    b. 총 끝낸 횟수

  #2. Maximum days in a row
    a. 가장 긴 연속날
    b. 현재 연속 날
    c. 가장 최근 날짜 (Date)

  #3. Longest timing duration
    a. 가장 길게 집중한 시간
*/

export interface IBehaviorDataType {
  finishBehavior: {
    pauseCount: number;
    wholeCount: number;
  };
  daysInARow: {
    maximumDays: number;
    currentDays: number;
    recentDate: Date | null;
  };
  longestDuration: number;
}

export type SetStateType<T> = Dispatch<SetStateAction<T>>;

export type LanguageOptionType = "kor" | "en";

export type ClockColorType = keyof typeof Theme.clock.color;

export type ProgressUnitType = "time" | "percentage";

export type MenuContentType = "main" | "display" | "time";

export type MaxClockTimeType = typeof maxClockTimes[number];

export type ClockTimeUnitType = typeof clockTimeUnits[number];

export type FlexableNavSectionType = "overview" | "logs";
