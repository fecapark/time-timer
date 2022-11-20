import React, { useEffect, useRef } from "react";
import {
  ClockBackground,
  ClockCenter,
  ClockHandler,
  Container,
  Graduation,
  MainClock,
} from "./Clock.style";
import { range } from "./Clock.util";
import { Vector2 } from "../../utils/vector";

export default function Clock() {
  const moveAreaRef = useRef<HTMLDivElement>(null);
  const handlerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!moveAreaRef.current) return;
    if (!handlerRef.current) return;

    const getRelPos = (offsetPos: Vector2) => {
      return offsetPos.sub(centerPos.sub(moveAreaPos));
    };

    const getRotationDegree = (offsetPos: Vector2) => {
      const relPos = getRelPos(offsetPos).normalize();
      const isRightSide = relPos.x >= 0;
      let degree = Math.acos(relPos.dot(new Vector2(0, -1))) * (180 / Math.PI);
      degree = isRightSide ? degree : 360 - degree;

      return degree;
    };

    const pointerDownHandler = (e: PointerEvent) => {
      canSet = true;
      stop = false;

      const offsetPos = new Vector2(e.offsetX, e.offsetY);
      const degree = getRotationDegree(offsetPos);

      requestAnimationFrame(() => {
        handlerRef.current!.style.transform = `
          translate3d(-50%, -50%, 0) 
          rotate3d(0, 0, 1, ${degree}deg)
        `;
        moveAreaRef.current!.style.background = `
          conic-gradient(#00000000 ${degree}deg, #FA3141dd ${degree}deg)
        `;
      });
    };

    const pointerMoveHandler = (e: PointerEvent) => {
      if (!canSet) return;

      const offsetPos = new Vector2(e.offsetX, e.offsetY);
      const relPos = getRelPos(offsetPos);
      let degree = stop ? 0 : getRotationDegree(offsetPos);

      if (
        relPos.y <= 0 &&
        relPos.x < 0 &&
        prevRelPos !== null &&
        prevRelPos.x >= 0
      ) {
        stop = true;
        degree = 0;
      } else if (relPos.y <= 0 && relPos.x >= 0) {
        stop = false;
      }
      prevRelPos = relPos.copy();

      requestAnimationFrame(() => {
        handlerRef.current!.style.transform = `
          translate3d(-50%, -50%, 0) 
          rotate3d(0, 0, 1, ${degree}deg)
        `;
        moveAreaRef.current!.style.background = `
          conic-gradient(#00000000 ${degree}deg, #FA3141dd ${degree}deg)
        `;
      });
    };

    const pointerEndHandler = () => {
      canSet = false;
      stop = false;
    };

    let canSet = false;
    let stop = false;
    const {
      width,
      height,
      x: hx,
      y: hy,
    } = handlerRef.current.getBoundingClientRect();
    const { x: ax, y: ay } = moveAreaRef.current.getBoundingClientRect();

    const moveAreaPos = new Vector2(ax, ay);
    const centerPos = new Vector2(hx + width / 2, hy + height / 2);
    let prevRelPos: Vector2 | null = null;

    moveAreaRef.current.addEventListener("pointerdown", pointerDownHandler);
    moveAreaRef.current.addEventListener("pointermove", pointerMoveHandler);
    moveAreaRef.current.addEventListener("pointerup", pointerEndHandler);
    moveAreaRef.current.addEventListener("pointerout", pointerEndHandler);

    return () => {
      moveAreaRef.current?.removeEventListener(
        "pointerdown",
        pointerDownHandler
      );
      moveAreaRef.current?.removeEventListener(
        "pointermove",
        pointerMoveHandler
      );
      moveAreaRef.current?.removeEventListener("pointerup", pointerEndHandler);
      moveAreaRef.current?.removeEventListener("pointerout", pointerEndHandler);
    };
  }, [moveAreaRef.current, handlerRef.current]);

  return (
    <Container>
      <MainClock>
        <ClockCenter>
          {range(60).map((i) => (
            <Graduation rotate={i * 6} accent={i % 5 == 0} gap={16} key={i}>
              {i % 5 == 0 ? <span>{i}</span> : null}
            </Graduation>
          ))}
          <ClockBackground ref={moveAreaRef} />
          <ClockHandler ref={handlerRef}>
            <div className="pointer"></div>
          </ClockHandler>
        </ClockCenter>
      </MainClock>
    </Container>
  );
}
