import { useSetRecoilState } from "recoil";
import {
  bottomSheetContentAtom,
  isBottomSheetActiveAtom,
} from "../shared/atom";

export default function useBottomSheet({ content }: { content: JSX.Element }) {
  const setIsBottomSheetActive = useSetRecoilState(isBottomSheetActiveAtom);
  const setBottomSheetContent = useSetRecoilState(bottomSheetContentAtom);

  const setThisBottomSheet = (state: boolean) => {
    setIsBottomSheetActive(state);
    setBottomSheetContent(content);
  };

  return setThisBottomSheet;
}
