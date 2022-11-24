import styled from "@emotion/styled";

const Container = styled.div`
  position: absolute;

  right: 60px;
  bottom: 60px;
`;

const TimeText = styled.div`
  font-size: 60px;
  line-height: 60px;
  font-weight: 100;

  display: flex;
  flex-direction: column;
  align-items: flex-end;

  transform-origin: right bottom;
  transform: scale(1);
  transition: transform 0.15s cubic-bezier(0, 0, 0, 1);

  .zoom {
    transform: scale(2);
    transition: transform 0.3s cubic-bezier(0.2, 0, 0, 1);
  }

  .row {
    width: 100%;

    display: flex;
    justify-content: space-between;

    .min,
    .sec {
      font-family: "Poppins", sans-serif;
    }

    .unit {
      font-weight: 300;
      font-size: 0.2em;
      line-height: 0.2em;
    }
  }
`;

export default function Timer() {
  return (
    <Container>
      <TimeText>
        <div className="row">
          <span className="min">60</span>
        </div>
        <div className="row">
          <span className="sec">00</span>
        </div>
      </TimeText>
    </Container>
  );
}
