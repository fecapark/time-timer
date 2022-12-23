import { useSetRecoilState } from "recoil";
import {
  bottomSheetContentConstructorAtom as BSCC,
  isBottomSheetActiveAtom as IBSA,
} from "../shared/atom";
import { IBottomSheetContentConstructorProp } from "../shared/types";

interface IProps {
  constructor: React.FC<IBottomSheetContentConstructorProp>;
}

export default function useBottomSheet({ constructor }: IProps) {
  const setIsBottomSheetActive = useSetRecoilState(IBSA);
  const setBottomSheetContentConstructor = useSetRecoilState(BSCC);

  const setThisBottomSheet = (state: boolean) => {
    setIsBottomSheetActive(state);
    setBottomSheetContentConstructor(() => constructor);
  };

  return setThisBottomSheet;
}
