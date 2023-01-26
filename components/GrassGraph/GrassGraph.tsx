import { useRef, useState, useMemo, useEffect } from "react";
import {
  Container,
  ContentContainer,
  GrassBlock,
  GrassColorsetInfoContainer,
  GrassGrid,
} from "./GrassGraph.styled";
import {
  IGrassColorsetInfoProps,
  IGrassGraphProps,
  IGrassProps,
} from "./GrassGraph.type";
import { languageOptionValueAtom as LOV } from "../../shared/atom";
import { useRecoilValue } from "recoil";

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
  const language = useRecoilValue(LOV);

  /* 
    Memos
  */
  const parsedDatas = useMemo(() => {
    const res: number[] = [];
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
  useEffect(() => {
    const onResize = () => {
      const { width: gridWidth } = gridRef.current!.getBoundingClientRect();
      const gridItemPixelSize = 10;
      const gridGap = 4;

      const columns = Math.floor(
        (gridWidth + gridGap) / (gridItemPixelSize + gridGap)
      );

      setGridMaxItems(7 * columns);
    };

    if (!gridRef.current) return;

    window.addEventListener("resize", onResize);
    onResize();

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [gridRef.current]);

  return (
    <Container>
      <ContentContainer>
        <div className="grid-timeline-info">
          <span>{language === "kor" ? "예전" : "Past"}</span>
          <span>{language === "kor" ? "최근" : "Present"}</span>
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
          leftText={language === "kor" ? "0분" : "0min"}
          rightText={language === "kor" ? "2시간" : "2hrs"}
          color={color}
          colorBoundary={colorBoundary}
        />
      </ContentContainer>
      <div className="grid-date-info">
        <span>{language === "kor" ? "오늘" : "Today"}</span>
      </div>
    </Container>
  );
}
