import styled from "@emotion/styled";
import { useRef, useState, useMemo } from "react";
import useRefEffect from "../../hooks/useRefEffect";
import { range } from "../Clock/Clock.util";

interface IGrassGraphProps {
  color: string;
}

interface IGrassProps {
  value: number;
  color: string;
}

interface IGrassColorsetInfoProps {
  color: string;
}

const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-end;

  font-family: ${({ theme }) => theme.font.family.primary};

  .grid-timeline-info {
    width: 100%;
    display: flex;
    justify-content: space-between;

    font-size: 11px;
    margin-bottom: 0.5em;
  }
`;

const GrassGrid = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 10px;
  grid-template-rows: repeat(7, 10px);
  gap: 4px;

  width: 100%;

  overflow-x: hidden;
`;

const GrassBlock = styled.div<{ backgroundColor: string }>`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.backgroundColor};

  border-radius: 1px;
`;

const GrassColorsetInfoContainer = styled.div`
  margin-top: 16px;

  display: flex;
  align-items: center;
  gap: 4px;

  .color {
    width: 10px;
    height: 10px;
    border-radius: 1px;
  }

  span {
    font-size: 12px;
    color: #e0e0e0;
  }
`;

const getGrassColorByValue = (value: number, hex: string) => {
  if (value < 10) return `${hex}33`;
  if (value < 30) return `${hex}66`;
  if (value < 60) return `${hex}aa`;
  if (value < 120) return `${hex}dd`;
  return `${hex}ff`;
};

function Grass({ value, color }: IGrassProps) {
  return <GrassBlock backgroundColor={getGrassColorByValue(value, color)} />;
}

function GrassColorsetInfo({ color }: IGrassColorsetInfoProps) {
  const minuteBoundaries = [0, 10, 30, 60, 120];

  return (
    <GrassColorsetInfoContainer>
      <span style={{ marginRight: 6 }}>0min</span>
      {minuteBoundaries.map((aBoundary) => (
        <div
          key={aBoundary}
          className="color"
          style={{
            backgroundColor: getGrassColorByValue(aBoundary, color),
          }}
        ></div>
      ))}
      <span style={{ marginLeft: 6 }}>2hrs</span>
    </GrassColorsetInfoContainer>
  );
}

export default function GrassGraph({ color }: IGrassGraphProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [gridMaxItems, setGridMaxItems] = useState(0);

  const slicedItems = useMemo(() => {
    const realItems = range(1000);
    return realItems.slice(
      Math.max(realItems.length - gridMaxItems, 0),
      realItems.length
    );
  }, [gridMaxItems]);

  useRefEffect(() => {
    const onResize = () => {
      const { width: gridWidth } = gridRef.current!.getBoundingClientRect();
      const gridItemPixelSize = 10;
      const gridGap = 4;

      const columns = Math.floor(
        (gridWidth + gridGap) / (gridItemPixelSize + gridGap)
      );

      setGridMaxItems(7 * columns);
    };

    window.addEventListener("resize", onResize);
    onResize();

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [gridRef]);

  return (
    <Container>
      <div className="grid-timeline-info">
        <span>Past</span>
        <span>Present</span>
      </div>
      <GrassGrid ref={gridRef}>
        {slicedItems.map((_, i) => {
          return <Grass key={i} color={color} value={Math.random() * 180} />;
        })}
      </GrassGrid>
      <GrassColorsetInfo color={color} />
    </Container>
  );
}
