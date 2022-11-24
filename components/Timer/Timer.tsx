import styled from "@emotion/styled";
import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { clockDegreeAtom, isClockPointerDownAtom } from "../../shared/atom";

const Container = styled.div`
  position: absolute;

  right: 60px;
  bottom: 60px;
`;

const TimeText = styled.div<{ onZoom: boolean }>`
  font-size: 60px;
  line-height: 60px;
  font-weight: 100;

  display: flex;
  flex-direction: column;
  align-items: flex-end;

  transform-origin: right bottom;
  transform: scale(${(props) => (props.onZoom ? 2.5 : 1)});
  transition: transform
    ${(props) =>
      props.onZoom
        ? "0.3s cubic-bezier(0.2, 0, 0, 1)"
        : "0.15s cubic-bezier(0, 0, 0, 1)"};
  transition-delay: 0.3s;

  .row {
    width: 100%;
    display: flex;
    justify-content: flex-end;

    .min,
    .sec {
      font-family: "Poppins", sans-serif;
    }
  }
`;

export default function Timer() {
  const isClockPointerDown = useRecoilValue(isClockPointerDownAtom);
  const clockDegree = useRecoilValue(clockDegreeAtom);

  const getTimeFromDegree = useCallback(() => {
    const totalSec = Math.round((360 - clockDegree) * 10);
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;

    return {
      min: min < 10 ? `0${min}` : `${min}`,
      sec: sec < 10 ? `0${sec}` : `${sec}`,
    };
  }, [clockDegree]);

  return (
    <Container>
      <TimeText onZoom={isClockPointerDown}>
        <div className="row">
          <span className="min">{getTimeFromDegree().min}</span>
        </div>
        <div className="row">
          <span className="sec">{getTimeFromDegree().sec}</span>
        </div>
      </TimeText>
    </Container>
  );
}
