import { Dispatch, SetStateAction } from "react";
import { atom } from "recoil";
import { v1 } from "uuid";
import { IAudioData, IModalContentPayload } from "./types";

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
