import React from "react";
import { atom } from "recoil";
import { v1 } from "uuid";
import {
  IAudioData,
  IModalContentPayload,
  IBottomSheetContentConstructorProp,
  ClockColorType,
  LanguageOptionType,
  MenuSectionType,
} from "./types";

export const isClockPointerDownAtom = atom<boolean>({
  key: `on-clock-pointer-down/${v1()}`,
  default: false,
});

export const clockDegreeAtom = atom<number>({
  key: `clock-degree/${v1()}`,
  default: 359.6,
});

export const isTimingNowAtom = atom<boolean>({
  key: `is-timing-now/${v1()}`,
  default: false,
});

export const soundEffectAudioAtom = atom<IAudioData | null>({
  key: `sound-effect-audios/${v1()}`,
  default: null,
});

export const isNotificationSupportEnvironmentAtom = atom<boolean>({
  key: `is-notification-support-environment/${v1()}`,
  default: true,
});

export const isNotificationPermissionGrantedAtom = atom<boolean>({
  key: `is-notification-permission-granted/${v1()}`,
  default: false,
});

export const isModalActiveAtom = atom<boolean>({
  key: `is-modal-active/${v1()}`,
  default: false,
});

export const modalContentAtom = atom<IModalContentPayload | null>({
  key: `modal-content/${v1()}`,
  default: null,
});

export const clockSizeAtom = atom<number>({
  key: `clock-size/${v1()}`,
  default: 0,
});

export const isBottomSheetActiveAtom = atom<boolean>({
  key: `is-bottom-sheet-active/${v1()}`,
  default: false,
});

export const bottomSheetContentConstructorAtom = atom<
  React.FC<IBottomSheetContentConstructorProp>
>({
  key: `bottom-sheet-content/${v1()}`,
  default: ({ hideBottomSheet }) => null,
});

export const isAlarmSoundOnAtom = atom<boolean>({
  key: `is-alram-sound-on/${v1()}`,
  default: false,
});

export const isSendPushOnAtom = atom<boolean>({
  key: `is-send-push-on/${v1()}`,
  default: false,
});

export const isActiveMenuAtom = atom<boolean>({
  key: `is-active-menu/${v1()}`,
  default: false,
});

export const clockColorDefaultValue: ClockColorType = "red";
export const clockColorValueAtom = atom<ClockColorType>({
  key: `clock-color-value/${v1()}`,
  default: clockColorDefaultValue,
});

export const languageOptionDefaultValue: LanguageOptionType = "kor";
export const languageOptionValueAtom = atom<LanguageOptionType>({
  key: `language-option-value/${v1()}`,
  default: languageOptionDefaultValue,
});

export const isSliderActiveAtom = atom<boolean>({
  key: `is-slider-active/${v1()}`,
  default: false,
});
