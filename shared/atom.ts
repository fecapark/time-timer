import { atom } from "recoil";
import { v1 } from "uuid";

export const isClockPointerDownAtom = atom<boolean>({
  key: `on-clock-pointer-down/${v1()}`,
  default: false,
});

export const clockDegreeAtom = atom<number>({
  key: `clock-degree/${v1()}`,
  default: 360,
});

export const isTimingNowAtom = atom<boolean>({
  key: `is-timing-now/${v1()}`,
  default: false,
});

export const soundEffectLoadedAtom = atom<boolean>({
  key: `sound-effect-loaded/${v1()}`,
  default: false,
});

export const soundEffectAudiosAtom = atom<Record<string, HTMLAudioElement>>({
  key: `sound-effect-audios/${v1()}`,
  default: {},
});

export const isNotificationSupportEnvironmentAtom = atom<boolean>({
  key: `is-notification-support-environment/${v1()}`,
  default: true,
});

export const isNotificationPermissionGranted = atom<boolean>({
  key: `is-notification-permission-granted/${v1()}`,
  default: false,
});
