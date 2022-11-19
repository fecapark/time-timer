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
