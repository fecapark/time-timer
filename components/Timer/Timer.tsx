import { useRecoilValue } from "recoil";
import { clockDegreeAtom, isClockPointerDownAtom } from "../../shared/atom";
import { Container, TimeText } from "./Timer.styled";
import { getTimeFromDegree } from "./Timer.util";

export default function Timer() {
  const isClockPointerDown = useRecoilValue(isClockPointerDownAtom);
  const clockDegree = useRecoilValue(clockDegreeAtom);
  const { min, sec } = getTimeFromDegree(clockDegree);

  return (
    <Container>
      <TimeText onZoom={isClockPointerDown}>
        <div className="row">
          <span className="min">{min}</span>
        </div>
        <div className="row">
          <span className="sec">{sec}</span>
        </div>
      </TimeText>
    </Container>
  );
}
