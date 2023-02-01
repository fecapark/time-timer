import { useRef, useState, useMemo, useEffect } from "react";
import { Container, ContentContainer, GrassGrid } from "./GrassGraph.styled";
import { IGrassGraphProps } from "./GrassGraph.type";
import { languageOptionValueAtom as LOV } from "../../shared/atom";
import { useRecoilValue } from "recoil";
import GrassColorsetInfo from "./GrassColorsetInfo/GrassColorsetInfo";
import Grass from "./Grass/Grass";

export default function GrassGraph({
  color,
  recentDatas,
  colorBoundary,
}: IGrassGraphProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const language = useRecoilValue(LOV);
  const [gridMaxItems, setGridMaxItems] = useState(0);

  const parsedDatas = useMemo(() => {
    const ZERO_SIZE = Math.max(gridMaxItems - recentDatas.length, 0);
    const zeros = Array(ZERO_SIZE).fill(0);
    const datas = recentDatas.slice(0, gridMaxItems);
    return [...zeros, ...datas.reverse()];
  }, [recentDatas, gridMaxItems]);

  const grassItems = useMemo(() => {
    return parsedDatas.map((v, i) => {
      return (
        <Grass key={i} color={color} value={v} colorBoundary={colorBoundary} />
      );
    });
  }, [parsedDatas]);

  useEffect(() => {
    const onResize = () => {
      const GRID_ROW_COUNT = 7;
      const GRID_ITEM_SIZE = 10;
      const GRID_GAP = 4;
      const { width } = gridRef.current!.getBoundingClientRect();
      const columns = Math.floor(
        (width + GRID_GAP) / (GRID_ITEM_SIZE + GRID_GAP)
      );

      setGridMaxItems(GRID_ROW_COUNT * columns);
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
        <GrassGrid ref={gridRef}>{grassItems}</GrassGrid>
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
