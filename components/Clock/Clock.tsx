import React, { useEffect, useRef } from "react";
import { Vector2 } from "../../utils/vector";
import {
  ClockBackground,
  ClockCenter,
  ClockHandler,
  Container,
  Graduation,
  MainClock,
} from "./Clock.style";
import { range } from "./Clock.util";

export default function Clock() {
  const moveAreaRef = useRef<HTMLDivElement>(null);
  const handlerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!moveAreaRef.current) return;
    if (!handlerRef.current) return;

    const pointerDownHandler = () => {
      canSet = true;
    };

    const pointerMoveHandler = (e: PointerEvent) => {
      if (!canSet) return;
      const offsetPos = new Vector2(e.offsetX, e.offsetY);
      const relPos = offsetPos.sub(centerPos.sub(moveAreaPos)).normalize();
      const isRightSide = relPos.x >= 0;
      const cos = Math.acos(relPos.dot(new Vector2(0, -1))) * (180 / Math.PI);

      requestAnimationFrame(() => {
        handlerRef.current!.style.transform = `translate3d(-50%, -50%, 0) rotate3d(0, 0, 1, ${
          isRightSide ? 360 + cos : -cos
        }deg)`;
      });
    };

    const pointerEndHandler = () => {
      canSet = false;
    };

    let canSet = false;
    const {
      width,
      height,
      x: hx,
      y: hy,
    } = handlerRef.current.getBoundingClientRect();
    const { x: ax, y: ay } = moveAreaRef.current.getBoundingClientRect();

    const moveAreaPos = new Vector2(ax, ay);
    const centerPos = new Vector2(hx + width / 2, hy + height / 2);

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
          <ClockBackground ref={moveAreaRef} />
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
