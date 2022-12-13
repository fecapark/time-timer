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

let canSetClockDegree = false;
let isOverLimited = false;

export default function Clock() {
  const moveAreaRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const handlerRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<HTMLDivElement>(null);

  const isTimingNow = useRecoilValue(isTimingNowAtom);
  const setIsClockPointerDown = useSetRecoilState(isClockPointerDownAtom);
  const [clockDegree, setClockDegree] = useRecoilState(clockDegreeAtom);

  useEffect(() => {
    if (!handlerRef.current) return;
    if (!backgroundRef.current) return;

    updateClockShapeByDegree(
      clockDegree,
      handlerRef.current!,
      backgroundRef.current!
    );
  }, [clockDegree, handlerRef.current, backgroundRef.current]);

  useEffect(() => {
    if (!moveAreaRef.current) return;
    if (!handlerRef.current) return;

    const pointerDownHandler = (e: PointerEvent) => {
      canSetClockDegree = true;
      isOverLimited = false;

      if (isTimingNow) return;

      const offsetPos = new Vector2(e.clientX, e.clientY).sub(moveAreaPos);
      const relPos = getPointerPosFromCenter(offsetPos, centerPos, moveAreaPos);
      const degree = getRotationDegree(relPos);

      setIsClockPointerDown(true);
      setClockDegree(degree);
    };

    const pointerMoveHandler = (e: PointerEvent) => {
      if (!canSetClockDegree) return;
      if (isTimingNow) return;

      const offsetPos = new Vector2(e.clientX, e.clientY).sub(moveAreaPos);
      const relPos = getPointerPosFromCenter(offsetPos, centerPos, moveAreaPos);
      let degree = isOverLimited ? 0 : getRotationDegree(relPos);

      if (isRotatedOverOneRound(relPos, prevRelPos)) {
        isOverLimited = true;
        degree = 0;
      } else if (isMovedToRightWhenStoped(relPos, isOverLimited)) {
        isOverLimited = false;
      }

      prevRelPos = relPos.copy();
      setClockDegree(degree);
    };

    const pointerEndHandler = () => {
      if (!canSetClockDegree) return;

      canSetClockDegree = false;
      isOverLimited = false;
      setIsClockPointerDown(false);
    };

    const handleResize = () => {
      const { width, height, x, y } =
        handlerRef.current!.getBoundingClientRect();
      const { x: ax, y: ay } = moveAreaRef.current!.getBoundingClientRect();

      moveAreaPos = new Vector2(ax, ay);
      centerPos = new Vector2(x + width / 2, y + height / 2);
    };

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
  }, [moveAreaRef.current, handlerRef.current, isTimingNow]);

  useEffect(() => {
    if (!resizeRef.current) return;

    const onResize = () => {
      const stageWidth = document.body.clientWidth;
      const stageHeight = document.body.clientHeight;

      const resizedWidth = Math.min(600, stageWidth);
      const resizedHeight = Math.min(600 + 180, stageHeight - 180);
      const resultSize = Math.min(resizedWidth, resizedHeight);
      const resultScaleRatio = Math.min(1, resultSize / 600);

      resizeRef.current!.style.transform = `
        scale(${resultScaleRatio})
      `;
      moveAreaRef.current!.style.width = `${resultSize}px`;
      moveAreaRef.current!.style.height = `${resultSize}px`;
    };

    window.addEventListener("resize", onResize);
    onResize();

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [resizeRef.current]);

  return (
    <Container ref={resizeRef}>
      <MainClock ref={moveAreaRef}>
        <ClockCenter>
          {range(60).map((i) => (
            <Graduation
              rotate={i * 6}
              accent={i % 5 == 0}
              gap={24}
              key={i}
              spanAccent={(360 - clockDegree) * 10 >= i * 60}
            >
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
