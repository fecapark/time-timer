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
  updateClockShapeByDegree,
} from "./Clock.util";
import { Vector2 } from "../../utils/vector";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  clockDegreeAtom,
  isClockPointerDownAtom,
  isTimingNowAtom,
} from "../../shared/atom";

export default function Clock() {
  const moveAreaRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const handlerRef = useRef<HTMLDivElement>(null);

  const isTimingNow = useRecoilValue(isTimingNowAtom);
  const setIsClockPointerDown = useSetRecoilState(isClockPointerDownAtom);
  const [clockDegree, setClockDegree] = useRecoilState(clockDegreeAtom);

  useEffect(() => {
    if (!handlerRef.current) return;
    if (!backgroundRef.current) return;
    if (!isTimingNow) return;

    updateClockShapeByDegree(
      clockDegree,
      handlerRef.current!,
      backgroundRef.current!
    );
  }, [isTimingNow, clockDegree, handlerRef.current, backgroundRef.current]);

  useEffect(() => {
    if (!moveAreaRef.current) return;
    if (!handlerRef.current) return;
    if (!backgroundRef.current) return;

    const pointerDownHandler = (e: PointerEvent) => {
      canSet = true;
      stop = false;

      if (isTimingNow) return;

      const offsetPos = new Vector2(e.clientX, e.clientY).sub(moveAreaPos);
      const relPos = getPointerPosFromCenter(offsetPos, centerPos, moveAreaPos);
      const degree = getRotationDegree(relPos);
      updateClockShapeByDegree(
        degree,
        handlerRef.current!,
        backgroundRef.current!
      );
      setIsClockPointerDown(true);
      setClockDegree(degree);
    };

    const pointerMoveHandler = (e: PointerEvent) => {
      if (!canSet) return;
      if (isTimingNow) return;

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
      updateClockShapeByDegree(
        degree,
        handlerRef.current!,
        backgroundRef.current!
      );
      setClockDegree(degree);
    };

    const pointerEndHandler = () => {
      if (!canSet) return;
      if (isTimingNow) return;

      canSet = false;
      stop = false;
      setIsClockPointerDown(false);
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
  }, [
    moveAreaRef.current,
    backgroundRef.current,
    handlerRef.current,
    isTimingNow,
  ]);

  return (
    <Container>
      <MainClock ref={moveAreaRef}>
        <ClockCenter>
          {range(60).map((i) => (
            <Graduation rotate={i * 6} accent={i % 5 == 0} gap={20} key={i}>
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
