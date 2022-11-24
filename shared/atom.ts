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
