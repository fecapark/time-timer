import { atom } from "recoil";
import { v1 } from "uuid";

export const isClockPointerDownAtom = atom({
  key: `on-clock-pointer-down/${v1()}`,
  default: false,
});
