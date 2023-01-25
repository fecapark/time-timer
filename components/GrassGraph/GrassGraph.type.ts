export interface IGrassGraphProps {
  color: string;
  recentDatas: Array<number>;
  colorBoundary: [number, number, number, number];
}

export interface IGrassProps {
  value: number;
  color: string;
  colorBoundary: [number, number, number, number];
}

export interface IGrassColorsetInfoProps {
  color: string;
  colorBoundary: [number, number, number, number];
  leftText: string;
  rightText: string;
}
