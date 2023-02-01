import { Theme } from "../../styles/theme";

export function getGrassColorByValue(
  value: number,
  hex: string,
  boundary: [number, number, number, number]
) {
  if (value < boundary[0]) return `${Theme.background.secondary}`;
  if (value < boundary[1]) return `${hex}66`;
  if (value < boundary[2]) return `${hex}aa`;
  if (value < boundary[3]) return `${hex}dd`;
  return `${hex}ff`;
}
