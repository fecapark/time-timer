import { MouseEventHandler } from "react";

export interface IProps {
  text: string;
  triggerHide?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}
