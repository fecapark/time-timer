import { IBottomSheetContentConstructorProp } from "../../../../shared/types";
import Timer from "../../../Timer/Timer";
import { ContentContainer } from "./BottomSheetTimer.styled";

export default function BottomSheetTimer({
  hideBottomSheet,
}: IBottomSheetContentConstructorProp) {
  return (
    <ContentContainer>
      <Timer
        disableAnimation={true}
        onTimingStart={() => {
          hideBottomSheet();
        }}
      />
    </ContentContainer>
  );
}
