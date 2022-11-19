interface IVector2 {
  x: number;
  y: number;

  copy(): Vector2;
  add(other: Vector2): Vector2;
  sub(other: Vector2): Vector2;
  mul(num: number): Vector2;
  div(num: number): Vector2;
  dist(other: Vector2): number;
  norm(): number;
  normalize(): Vector2;
  dot(other: Vector2): number;
  cross(other: Vector2): number;
}

export class Vector2 implements IVector2 {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  copy() {
    return new Vector2(this.x, this.y);
  }

  add(other: Vector2) {
    return new Vector2(this.x + other.x, this.y + other.y);
  }

  sub(other: Vector2) {
    return new Vector2(this.x - other.x, this.y - other.y);
  }

  mul(num: number) {
    return new Vector2(this.x * num, this.y * num);
  }

  div(num: number) {
    if (num === 0) {
      return new Vector2(0, 0);
    }

    return new Vector2(this.x / num, this.y / num);
  }

  dist(other: Vector2) {
    return this.sub(other).norm();
  }

  norm() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }

  normalize() {
    return this.div(this.norm());
  }

  dot(other: Vector2) {
    return this.x * other.x + this.y * other.y;
  }

  cross(other: Vector2) {
    return this.x * other.y - this.y * other.x;
  }
}
