import "@emotion/react";
import { Theme } from "./theme";

type T = typeof Theme;

declare module "@emotion/react" {
  export interface Theme extends T {}
}
