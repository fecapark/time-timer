import React, { useEffect, useRef, useState, PointerEvent } from "react";
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
  clockColorValueAtom as CCV,
  clockDegreeAtom as CD,
  clockSizeAtom as CS,
  isClockPointerDownAtom as ICPD,
  isTimingNowAtom as ITN,
} from "../../shared/atom";

let canSetClockDegree = false;
let isOverLimited = false;

export default function Clock() {
  const moveAreaRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const handlerRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<HTMLDivElement>(null);
  const [moveAreaPos, setMoveAreaPos] = useState<Vector2>(new Vector2(0, 0));
  const [centerPos, setCenterPos] = useState<Vector2>(new Vector2(0, 0));
  const [prevRelPos, setPrevRelPos] = useState<Vector2 | null>(null);
  const isTimingNow = useRecoilValue(ITN);
  const setIsClockPointerDown = useSetRecoilState(ICPD);
  const setClockSize = useSetRecoilState(CS);
  const [clockDegree, setClockDegree] = useRecoilState(CD);
  const clockColor = useRecoilValue(CCV);

  const onPointerDown = (e: PointerEvent) => {
    canSetClockDegree = true;
    isOverLimited = false;

    if (isTimingNow) return;

    const offsetPos = new Vector2(e.clientX, e.clientY).sub(moveAreaPos);
    const relPos = getPointerPosFromCenter(offsetPos, centerPos, moveAreaPos);
    const degree = getRotationDegree(relPos);

    setIsClockPointerDown(true);
    setClockDegree(degree);
  };

  const onPointerMove = (e: PointerEvent) => {
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

    setPrevRelPos(relPos.copy());
    setClockDegree(degree);
  };

  const onPointerEnd = () => {
    if (!canSetClockDegree) return;

    canSetClockDegree = false;
    isOverLimited = false;
    setIsClockPointerDown(false);
  };

  useEffect(() => {
    if (!handlerRef.current) return;
    if (!backgroundRef.current) return;

    updateClockShapeByDegree(
      clockDegree,
      clockColor,
      handlerRef.current!,
      backgroundRef.current!
    );
  }, [clockDegree, clockColor, handlerRef.current, backgroundRef.current]);

  useEffect(() => {
    if (!moveAreaRef.current) return;
    if (!handlerRef.current) return;

    const handleResize = () => {
      const { width, height, x, y } =
        handlerRef.current!.getBoundingClientRect();
      const { x: ax, y: ay } = moveAreaRef.current!.getBoundingClientRect();

      setMoveAreaPos(new Vector2(ax, ay));
      setCenterPos(new Vector2(x + width / 2, y + height / 2));
    };

    document.addEventListener("pointerup", onPointerEnd);
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("pointerup", onPointerEnd);
    };
  }, [moveAreaRef.current, handlerRef.current, isTimingNow]);

  useEffect(() => {
    if (!resizeRef.current) return;

    const onResize = () => {
      const stageWidth = document.body.clientWidth;
      const stageHeight = document.body.clientHeight;

      const resizedWidth = Math.min(600, stageWidth);
      const resizedHeight = Math.min(600 + 190, stageHeight - 190);
      const resultSize = Math.min(resizedWidth, resizedHeight);
      const resultScaleRatio = Math.min(1, resultSize / 600);

      resizeRef.current!.style.transform = `
        scale(${resultScaleRatio})
      `;
      moveAreaRef.current!.style.width = `${resultSize}px`;
      moveAreaRef.current!.style.height = `${resultSize}px`;
      setClockSize(resultSize);
    };

    window.addEventListener("resize", onResize);
    onResize();

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [resizeRef.current]);

  useEffect(() => {
    setClockDegree(0);
    setTimeout(() => {
      setClockDegree(360);
    }, 300);
  }, []);

  return (
    <Container ref={resizeRef}>
      <MainClock
        ref={moveAreaRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
      >
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
