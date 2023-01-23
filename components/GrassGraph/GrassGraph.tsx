import styled from "@emotion/styled";
import { useRef, useState, useMemo } from "react";
import useRefEffect from "../../hooks/useRefEffect";

interface IGrassGraphProps {
  color: string;
  recentDatas: Array<number>;
  colorBoundary: [number, number, number, number];
}

interface IGrassProps {
  value: number;
  color: string;
  colorBoundary: [number, number, number, number];
}

interface IGrassColorsetInfoProps {
  color: string;
  colorBoundary: [number, number, number, number];
  leftText: string;
  rightText: string;
}

const Container = styled.div`
  width: 100%;
  display: flex;

  .grid-date-info {
    width: 40px;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-bottom: 28px;
    padding-left: 8px;

    font-size: 11px;
  }
`;

const ContentContainer = styled.div`
  width: calc(100% - 40px);

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
  justify-content: flex-end;

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

const getGrassColorByValue = (
  value: number,
  hex: string,
  boundary: [number, number, number, number]
) => {
  if (value < boundary[0]) return `${hex}33`;
  if (value < boundary[1]) return `${hex}66`;
  if (value < boundary[2]) return `${hex}aa`;
  if (value < boundary[3]) return `${hex}dd`;
  return `${hex}ff`;
};

function Grass({ value, color, colorBoundary }: IGrassProps) {
  return (
    <GrassBlock
      backgroundColor={getGrassColorByValue(value, color, colorBoundary)}
    />
  );
}

function GrassColorsetInfo({
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

export default function GrassGraph({
  color,
  recentDatas,
  colorBoundary,
}: IGrassGraphProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [gridMaxItems, setGridMaxItems] = useState(0);

  /* 
    Memos
  */
  const parsedDatas = useMemo(() => {
    const res: number[] = [];
    console.log(recentDatas);
    for (let i = gridMaxItems - 1; i >= 0; i--) {
      if (i < recentDatas.length) {
        res.push(recentDatas[i]);
      } else {
        res.push(0);
      }
    }
    return res;
  }, [recentDatas, gridMaxItems]);

  /* 
    Effects
  */
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
      <ContentContainer>
        <div className="grid-timeline-info">
          <span>Past</span>
          <span>Present</span>
        </div>
        <GrassGrid ref={gridRef}>
          {parsedDatas.map((v, i) => {
            return (
              <Grass
                key={i}
                color={color}
                value={v}
                colorBoundary={colorBoundary}
              />
            );
          })}
        </GrassGrid>
        <GrassColorsetInfo
          leftText="0min"
          rightText="2hrs"
          color={color}
          colorBoundary={colorBoundary}
        />
      </ContentContainer>
      <div className="grid-date-info">
        <span>Today</span>
      </div>
    </Container>
  );
}
