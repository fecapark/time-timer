import styled from "@emotion/styled";
import React, { useEffect, useRef } from "react";
import { Vector2 } from "../../utils/vector";

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

  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
`;

const MainClock = styled.div`
  width: 600px;
  height: 600px;
  border: 4px solid ${({ theme }) => theme.background.secondary};
  border-radius: 24px;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: border-color 0.15s cubic-bezier(0, 0, 0, 1);

  &:hover {
    border-color: ${({ theme }) => theme.background.accent};
    transition: border-color 0.3s cubic-bezier(0.2, 0, 0, 1);
  }
`;

const ClockCenter = styled.div`
  position: relative;
`;

const ClockHandler = styled.div`
  width: 60px;
  height: 60px;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);

  border-radius: 50%;
  background-color: white;

  .pointer {
    width: 6px;
    height: 20px;
    background-color: inherit;

    border-top-left-radius: 2px;
    border-top-right-radius: 2px;

    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translate3d(-50%, 10%, 0);
  }
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

function range(n: number) {
  const res = [];
  for (let i = 0; i < n; i++) {
    res.push(i);
  }
  return res;
}

export default function Clock() {
  const handlerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!handlerRef.current) return;

    const dragHandler = (e: PointerEvent) => {
      const { offsetX, offsetY } = e;
      const pointerPos = new Vector2(offsetX - width / 2, offsetY - height / 2);

      // Todo: 여기서부터 이제 드래그시 회전하는 기능 만들면 됨.
    };

    const { width, height } = handlerRef.current.getBoundingClientRect();
    handlerRef.current.addEventListener("pointermove", dragHandler);

    return () => {
      handlerRef.current?.removeEventListener("pointermove", dragHandler);
    };
  }, [handlerRef.current]);

  return (
    <Container>
      <MainClock>
        <ClockCenter>
          <ClockHandler ref={handlerRef}>
            <div className="pointer"></div>
          </ClockHandler>
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
