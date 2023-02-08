import { useRef } from "react";
import { useRecoilValue } from "recoil";
import useViewportCollision from "../../../../../hooks/useViewportCollision";
import { clockColorValueAtom as CCV } from "../../../../../shared/atom";
import { Theme } from "../../../../../styles/theme";
import RecordCard from "../RecordCard/RecordCard";
import { Container } from "./SameDayContainer.styled";
import { ISameDayContainerProps } from "./SameDayContainer.type";

export default function SameDayContainer({
  dayRecords,
}: ISameDayContainerProps) {
  const fadeRef = useRef<HTMLDivElement>(null);
  const clockColor = useRecoilValue(CCV);
  const { collide, scrolled } = useViewportCollision({
    ref: fadeRef,
    threshold: 0.4,
    rootMargin: "0px 0px -80px 0px",
  });

  return (
    <Container
      ref={fadeRef}
      borderColor={Theme.clock.color[clockColor]}
      show={collide}
      scrolled={scrolled}
    >
      {dayRecords.map((aRecord, j) => {
        return (
          <RecordCard
            key={j}
            duration={aRecord.duration}
            endTime={aRecord.endTime}
            paused={aRecord.finishedByPaused}
            completeRatio={aRecord.completeRatio}
          />
        );
      })}
    </Container>
  );
}
