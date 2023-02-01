import { Theme } from "../styles/theme";
import { FlexableNavSectionType } from "../shared/types";
import { ReactNode } from "react";
import { useRecoilValue } from "recoil";
import {
  clockColorValueAtom as CCV,
  currentFlexableNavSectionAtom as CFNS,
  onFlexableNavTransitionAtom as OFNT,
} from "../shared/atom";
import RecordOverview from "../components/pages/records/RecordOverview/RecordOverview";
import RecordLogs from "../components/pages/records/RecordLogs/RecordLogs";
import { IoMdTime } from "react-icons/io";
import ConditionalLink from "../components/Button/ConditionalLink/ConditionalLink";
import Seo from "../components/SEO/Seo";
import {
  Container,
  GoHomeButtonContainer,
  PaddingAroundedContainer,
} from "../components/pages/records/index.styled";
import Hero from "../components/pages/records/Hero/Hero";
import Footer from "../components/pages/records/Footer/Footer";

export default function Records() {
  const clockColor = useRecoilValue(CCV);
  const isFlexableNavTransitioning = useRecoilValue(OFNT);
  const curHeroSection = useRecoilValue(CFNS);

  const sectionComponents: Record<FlexableNavSectionType, ReactNode> = {
    overview: <RecordOverview />,
    logs: <RecordLogs />,
  };

  return (
    <>
      <Seo
        title="Records | 타임 타이머"
        description="60분 온라인 타이머를 사용해서 최고의 집중을 만들어보세요."
      />
      <Container>
        <Hero />
        <PaddingAroundedContainer>
          {sectionComponents[curHeroSection]}
        </PaddingAroundedContainer>
        <Footer />
      </Container>
      <ConditionalLink href="/" disabled={isFlexableNavTransitioning}>
        <GoHomeButtonContainer
          color={`${Theme.clock.color[clockColor]}`}
          disabled={isFlexableNavTransitioning}
        >
          <div className="bg-filter"></div>
          <div className="icon-wrapper">
            <IoMdTime />
          </div>
        </GoHomeButtonContainer>
      </ConditionalLink>
    </>
  );
}
