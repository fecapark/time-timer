import { Dispatch, SetStateAction } from "react";

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

export type SetStateType<T> = Dispatch<SetStateAction<T>>;
