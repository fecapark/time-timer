import React, { useEffect, useRef } from "react";
import {
  ClockBackground,
  ClockCenter,
  ClockHandler,
  Container,
  Graduation,
  MainClock,
} from "./Clock.style";
import {
  getPointerPosFromCenter,
  getRotationDegree,
  isMovedToRightWhenStoped,
  isRotatedOverOneRound,
  range,
} from "./Clock.util";
import { Vector2 } from "../../utils/vector";

export default function Clock() {
  const moveAreaRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const handlerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!moveAreaRef.current) return;
    if (!handlerRef.current) return;
    if (!backgroundRef.current) return;

    const updateClockShapeByDegree = (degree: number) => {
      requestAnimationFrame(() => {
        handlerRef.current!.style.transform = `
          translate3d(-50%, -50%, 0) 
          rotate3d(0, 0, 1, ${degree}deg)
        `;
        backgroundRef.current!.style.background = `
          conic-gradient(#00000000 ${degree}deg, #FA3141dd ${degree}deg)
        `;
      });
    };

    const pointerDownHandler = (e: PointerEvent) => {
      canSet = true;
      stop = false;

      const offsetPos = new Vector2(e.clientX, e.clientY).sub(moveAreaPos);
      const relPos = getPointerPosFromCenter(offsetPos, centerPos, moveAreaPos);
      const degree = getRotationDegree(relPos);
      updateClockShapeByDegree(degree);
    };

    const pointerMoveHandler = (e: PointerEvent) => {
      if (!canSet) return;

      const offsetPos = new Vector2(e.clientX, e.clientY).sub(moveAreaPos);
      const relPos = getPointerPosFromCenter(offsetPos, centerPos, moveAreaPos);
      let degree = stop ? 0 : getRotationDegree(relPos);

      if (isRotatedOverOneRound(relPos, prevRelPos)) {
        stop = true;
        degree = 0;
      } else if (isMovedToRightWhenStoped(relPos, stop)) {
        stop = false;
      }

      prevRelPos = relPos.copy();
      updateClockShapeByDegree(degree);
    };

    const pointerEndHandler = () => {
      if (!canSet) return;
      canSet = false;
      stop = false;
    };

    const handleResize = () => {
      const { width, height, x, y } =
        handlerRef.current!.getBoundingClientRect();
      const { x: ax, y: ay } = moveAreaRef.current!.getBoundingClientRect();

      moveAreaPos = new Vector2(ax, ay);
      centerPos = new Vector2(x + width / 2, y + height / 2);
    };

    let canSet = false;
    let stop = false;

    let centerPos = new Vector2(0, 0);
    let moveAreaPos = new Vector2(0, 0);
    let prevRelPos: Vector2 | null = null;

    moveAreaRef.current.addEventListener("pointerdown", pointerDownHandler);
    moveAreaRef.current.addEventListener("pointermove", pointerMoveHandler);
    document.addEventListener("pointerup", pointerEndHandler);

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      moveAreaRef.current?.removeEventListener(
        "pointerdown",
        pointerDownHandler
      );
      moveAreaRef.current?.removeEventListener(
        "pointermove",
        pointerMoveHandler
      );
      document.removeEventListener("pointerup", pointerEndHandler);
    };
  }, [moveAreaRef.current, backgroundRef.current, handlerRef.current]);

  return (
    <Container>
      <MainClock ref={moveAreaRef}>
        <ClockCenter>
          {range(60).map((i) => (
            <Graduation rotate={i * 6} accent={i % 5 == 0} gap={16} key={i}>
              {i % 5 == 0 ? <span>{i}</span> : null}
            </Graduation>
          ))}
          <ClockBackground ref={backgroundRef} />
          <ClockHandler ref={handlerRef}>
            <div className="pointer"></div>
          </ClockHandler>
        </ClockCenter>
      </MainClock>
    </Container>
  );
}
