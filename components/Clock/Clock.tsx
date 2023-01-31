import React, {
  useEffect,
  useRef,
  useState,
  PointerEvent,
  useMemo,
} from "react";
import {
  ClockBackground,
  ClockCenter,
  ClockHandler,
  Container,
  MainClock,
} from "./Clock.styled";
import {
  getPointerPosFromCenter,
  getRotationDegree,
  isMovedToRightWhenStoped,
  isRotatedOverOneRound,
  range,
  rebaseClockDegree,
  setCursorGrabbing,
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
  maxClockTimeAtom as MCT,
  clockTimeUnitAtom as CTU,
  isIntroTimeoutedAtom as IIT,
} from "../../shared/atom";
import Graduation from "./Graduation/Graduation";

let canSetClockDegree = false;
let isOverLimited = false;

export default function Clock() {
  const moveAreaRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const handlerRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<HTMLDivElement>(null);
  const isTimingNow = useRecoilValue(ITN);
  const clockColor = useRecoilValue(CCV);
  const maxClockTime = useRecoilValue(MCT);
  const clockTimeUnit = useRecoilValue(CTU);
  const isIntroTimeouted = useRecoilValue(IIT);
  const setClockSize = useSetRecoilState(CS);
  const [moveAreaPos, setMoveAreaPos] = useState<Vector2>(new Vector2(0, 0));
  const [centerPos, setCenterPos] = useState<Vector2>(new Vector2(0, 0));
  const [prevRelPos, setPrevRelPos] = useState<Vector2 | null>(null);
  const [clockDegree, setClockDegree] = useRecoilState(CD);
  const [isClockPointerDown, setIsClockPointerDown] = useRecoilState(ICPD);

  const onPointerDown = (e: PointerEvent) => {
    canSetClockDegree = true;
    isOverLimited = false;

    if (isTimingNow) return;

    const offsetPos = new Vector2(e.clientX, e.clientY).sub(moveAreaPos);
    const relPos = getPointerPosFromCenter(offsetPos, centerPos, moveAreaPos);
    const degree = getRotationDegree(relPos, maxClockTime, clockTimeUnit);

    setCursorGrabbing(moveAreaRef, true);
    setIsClockPointerDown(true);
    setClockDegree(degree);
  };

  const onPointerMove = (e: PointerEvent) => {
    if (!canSetClockDegree) return;
    if (isTimingNow) return;

    const offsetPos = new Vector2(e.clientX, e.clientY).sub(moveAreaPos);
    const relPos = getPointerPosFromCenter(offsetPos, centerPos, moveAreaPos);
    let degree = isOverLimited
      ? 0
      : getRotationDegree(relPos, maxClockTime, clockTimeUnit);

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

    setCursorGrabbing(moveAreaRef, false);
    setIsClockPointerDown(false);
  };

  const rebaseDegree = () => {
    setClockDegree(rebaseClockDegree(clockDegree, maxClockTime));
  };

  const isIntroedOnce = () => isIntroTimeouted;

  const Graduations = useMemo(() => {
    return range(60).map((i) => <Graduation key={i} index={i} />);
  }, []);

  useEffect(() => {
    if (isClockPointerDown) return;
    rebaseDegree();
  }, [isClockPointerDown, maxClockTime]);

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
      const HORIZONTAL_PADDING_SIZE = 190;
      const CLOCK_SIZE = 600;

      const resizedWidth = Math.min(CLOCK_SIZE, stageWidth);
      const resizedHeight = Math.min(
        CLOCK_SIZE + HORIZONTAL_PADDING_SIZE,
        stageHeight - HORIZONTAL_PADDING_SIZE
      );
      const resultSize = Math.min(resizedWidth, resizedHeight);
      const resultScaleRatio = Math.min(1, resultSize / CLOCK_SIZE);

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
    if (isIntroedOnce()) return;
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
          {Graduations}
          <ClockBackground ref={backgroundRef} />
          <ClockHandler ref={handlerRef}>
            <div className="pointer"></div>
          </ClockHandler>
        </ClockCenter>
      </MainClock>
    </Container>
  );
}
