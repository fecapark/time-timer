import { Theme } from "../../../../styles/theme";
import FlexableNav, { FlexableNavItem } from "../../../FlexableNav/FlexableNav";
import {
  languageOptionValueAtom as LOV,
  clockColorValueAtom as CCV,
  currentFlexableNavSectionAtom as CFNS,
} from "../../../../shared/atom";
import { useRecoilState, useRecoilValue } from "recoil";
import { MdFormatListBulleted, MdViewQuilt } from "react-icons/md";
import { HeroContainer } from "./Hero.styled";

export default function Hero() {
  const language = useRecoilValue(LOV);
  const clockColor = useRecoilValue(CCV);
  const [curHeroSection, setCurrentHeroSection] = useRecoilState(CFNS);

  return (
    <HeroContainer>
      <FlexableNav>
        <FlexableNavItem
          position="left"
          title={language === "kor" ? "개요" : "Overview"}
          description={
            language === "kor"
              ? "한 눈에 기록된 시간들을 모아보세요."
              : "Gather your time records at a glance."
          }
          activeColor={`${Theme.clock.color[clockColor]}99`}
          isFlexed={curHeroSection === "logs"}
          flexedIcon={<MdViewQuilt />}
          onFlexedClick={() => {
            setCurrentHeroSection("overview");
          }}
        />
        <FlexableNavItem
          position="right"
          title={language === "kor" ? "기록" : "Logs"}
          description={
            language === "kor"
              ? "기록된 시간들을 시간순으로 나열했어요."
              : "Watch your records as a timeline."
          }
          activeColor={`${Theme.clock.color[clockColor]}99`}
          isFlexed={curHeroSection === "overview"}
          flexedIcon={<MdFormatListBulleted />}
          onFlexedClick={() => {
            setCurrentHeroSection("logs");
          }}
        />
      </FlexableNav>
    </HeroContainer>
  );
}
