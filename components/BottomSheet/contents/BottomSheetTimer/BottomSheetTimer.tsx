import styled from "@emotion/styled";
import Timer from "../../../Timer/Timer";

const Container = styled.div`
  padding: 48px 32px;
`;

export default function BottomSheetTimer() {
  return (
    <Container>
      <Timer />
    </Container>
  );
}
