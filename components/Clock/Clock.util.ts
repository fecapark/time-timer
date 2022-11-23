import { Vector2 } from "../../utils/vector";

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

export const getRotationDegree = (pointerPos: Vector2) => {
  const relPos = pointerPos.normalize();
  const isRightSide = relPos.x >= 0;
  let degree = Math.acos(relPos.dot(new Vector2(0, -1))) * (180 / Math.PI);
  degree = isRightSide ? degree : 360 - degree;

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
