import { Dispatch, SetStateAction } from "react";
import { Theme } from "../styles/theme";
import { maxClockTimes } from "./const";

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
}

export type SetStateType<T> = Dispatch<SetStateAction<T>>;

export type LanguageOptionType = "kor" | "en";

export type ClockColorType = keyof typeof Theme.clock.color;

export type ProgressUnitType = "time" | "percentage";

export type MenuContentType = "main" | "display";

export type MaxClockTimeType = typeof maxClockTimes[number];
