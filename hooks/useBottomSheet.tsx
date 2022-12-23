import React, { cloneElement } from "react";
import { useSetRecoilState } from "recoil";
import {
  bottomSheetContentConstructorAtom as BSCC,
  isBottomSheetActiveAtom as IBSA,
} from "../shared/atom";
import { IBottomSheetContentConstructorProp } from "../shared/types";

interface IProps {
  content: JSX.Element;
}

export default function useBottomSheet({ content }: IProps) {
  const setIsBottomSheetActive = useSetRecoilState(IBSA);
  const setBottomSheetContentConstructor = useSetRecoilState(BSCC);

  const setThisBottomSheet = (state: boolean) => {
    const wrapper = ({
      hideBottomSheet,
    }: IBottomSheetContentConstructorProp) => {
      return cloneElement(content, { hideBottomSheet });
    };

    setIsBottomSheetActive(state);
    setBottomSheetContentConstructor(() => wrapper);
  };

  return setThisBottomSheet;
}
