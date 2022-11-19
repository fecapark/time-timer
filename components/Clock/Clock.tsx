import styled from "@emotion/styled";

interface IGraduationStyleProps {
  rotate: number;
  accent: boolean;
}

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainClock = styled.div`
  width: 600px;
  height: 600px;
  border: 4px solid ${({ theme }) => theme.background.secondary};
  border-radius: 24px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

// const SizeTester = styled.div`
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate3d(-50%, -50%, 0);

//   width: 400px;
//   height: 400px;
//   border-radius: 50%;
//   background-color: #ffcc00;
// `;

const ClockCenter = styled.div`
  position: relative;
`;

const Graduation = styled.div<IGraduationStyleProps>`
  width: ${(props) => (props.accent ? 3 : 2)}px;
  height: ${(props) => (props.accent ? 20 : 14)}px;

  position: absolute;

  transform-origin: center center;
  transform: translate3d(
      ${(props) => {
        const { x, y } = getRotatedPosition(200, props.rotate);
        return `calc(-50% + ${x}px), calc(-50% + ${y}px), 0`;
      }}
    )
    rotate3d(0, 0, 1, ${(props) => -props.rotate}deg);
  background-color: ${(props) => (props.accent ? "white" : "grey")};
`;

function getRotatedPosition(radius: number, degree: number) {
  degree = 270 - degree;
  return {
    x: radius * Math.cos((degree * Math.PI) / 180),
    y: radius * Math.sin((degree * Math.PI) / 180),
  };
}

export default function Clock() {
  function range(n: number) {
    const res = [];
    for (let i = 0; i < n; i++) {
      res.push(i);
    }
    return res;
  }

  return (
    <Container>
      <MainClock>
        <ClockCenter>
          {/* <SizeTester></SizeTester> */}
          {range(60).map((i) => (
            <Graduation
              rotate={i * 6}
              accent={i % 5 == 0}
              id={`${i}`}
            ></Graduation>
          ))}
        </ClockCenter>
      </MainClock>
    </Container>
  );
}
