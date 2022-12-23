import styled from "@emotion/styled";
import { IBottomSheetContentConstructorProp } from "../../../../shared/types";
import Timer from "../../../Timer/Timer";

const ContentContainer = styled.div`
  padding: 48px 32px;
`;

export default function BottomSheetTimer({
  hideBottomSheet,
}: IBottomSheetContentConstructorProp) {
  return (
    <ContentContainer>
      <Timer
        onTimingStart={() => {
          hideBottomSheet();
        }}
      />
    </ContentContainer>
  );
}
