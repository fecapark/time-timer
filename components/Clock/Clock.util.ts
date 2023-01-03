import { Theme } from "../../styles/theme";
import { ClockColorType } from "../../shared/types";
import { Vector2 } from "../../utils/vector";
import { getTimeFromDegree } from "../Timer/Timer.util";
import { RefObject } from "react";

export function getRotatedPosition(radius: number, degree: number) {
  degree = 270 - degree;
  return {
    x: radius * Math.cos((degree * Math.PI) / 180),
    y: radius * Math.sin((degree * Math.PI) / 180),
  };
}

export function range(n: number) {
  const res = [];
  for (let i = 0; i < n; i++) {
    res.push(i);
  }
  return res;
}

export const getPointerPosFromCenter = (
  pointerPos: Vector2,
  centerPos: Vector2,
  moveAreaPos: Vector2
) => {
  return pointerPos.sub(centerPos.sub(moveAreaPos));
};

export const getRotationDegree = (
  pointerPos: Vector2,
  maxClockTime: number,
  clockTimeUnit: number
) => {
  const relPos = pointerPos.normalize();
  const isRightSide = relPos.x >= 0;
  let degree = Math.acos(relPos.dot(new Vector2(0, -1))) * (180 / Math.PI);
  degree = isRightSide ? degree : 360 - degree;

  degree -= degree % (clockTimeUnit / (maxClockTime / 6));

  return degree;
};

export const isRotatedOverOneRound = (
  pos: Vector2,
  prevPos: Vector2 | null
) => {
  const isPointerOnLeftSide = pos.y <= 0 && pos.x < 0;
  const isPointerOnRightBefore = prevPos !== null && prevPos.x >= 0;
  return isPointerOnLeftSide && isPointerOnRightBefore;
};

export const isMovedToRightWhenStoped = (pos: Vector2, isStopped: boolean) => {
  return isStopped && pos.x >= 0 && pos.y <= 0;
};

export const updateClockShapeByDegree = (
  degree: number,
  clockColor: ClockColorType,
  handler: HTMLElement,
  background: HTMLElement
) => {
  requestAnimationFrame(() => {
    handler.style.transform = `
      translate3d(-50%, -50%, 0) 
      rotate3d(0, 0, 1, ${degree}deg)
    `;
    background.style.background = `
      conic-gradient(#0000001e ${degree}deg, ${Theme.clock.color[clockColor]}dd ${degree}deg)
    `;
  });
};

export const rebaseClockDegree = (degree: number, maxClockTime: number) => {
  function timeToDegree(totalSec: number, maxClockTime: number) {
    const ratio = totalSec / (maxClockTime * 60);
    return 360 - ratio * 360;
  }

  const { min, sec } = getTimeFromDegree(degree, maxClockTime);
  const totalSec = parseInt(min, 10) * 60 + parseInt(sec, 10);

  return timeToDegree(totalSec, maxClockTime);
};

export const setCursorGrabbing = (
  ref: RefObject<HTMLDivElement>,
  state: boolean
) => {
  if (!ref.current) return;

  if (state) {
    ref.current.style.cursor = "grabbing";
  } else {
    ref.current.style.cursor = "";
  }
};
