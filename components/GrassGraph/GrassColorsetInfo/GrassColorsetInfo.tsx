import { getGrassColorByValue } from "../GrassGraph.util";
import { GrassColorsetInfoContainer } from "./GrassColorsetInfo.styled";
import { IGrassColorsetInfoProps } from "./GrassColorsetInfo.type";

export default function GrassColorsetInfo({
  color,
  colorBoundary,
  leftText,
  rightText,
}: IGrassColorsetInfoProps) {
  return (
    <GrassColorsetInfoContainer>
      <span style={{ marginRight: 6 }}>{leftText}</span>
      {[0, ...colorBoundary].map((aBoundary) => (
        <div
          key={aBoundary}
          className="color"
          style={{
            backgroundColor: getGrassColorByValue(
              aBoundary,
              color,
              colorBoundary
            ),
          }}
        ></div>
      ))}
      <span style={{ marginLeft: 6 }}>{rightText}</span>
    </GrassColorsetInfoContainer>
  );
}
