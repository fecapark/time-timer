import { getGrassColorByValue } from "../GrassGraph.util";
import { GrassBlock } from "./Grass.styled";
import { IGrassProps } from "./Grass.type";

export default function Grass({ value, color, colorBoundary }: IGrassProps) {
  return (
    <GrassBlock
      backgroundColor={getGrassColorByValue(value, color, colorBoundary)}
    ></GrassBlock>
  );
}
