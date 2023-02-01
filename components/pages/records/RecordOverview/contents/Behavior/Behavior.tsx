import { useRecoilValue } from "recoil";
import {
  ContentBody,
  ContentHeader,
  ContentSection,
  ValueDisplayer,
  ValueInfo,
  ValueItem,
} from "../../RecordOverview.styled";
import {
  clockColorValueAtom as CCV,
  languageOptionValueAtom as LOV,
} from "../../../../../../shared/atom";
import { splitIntAndFloatPartWithFixed } from "../../RecordOverview.util";
import { IBehaviorDataType } from "../../../../../../shared/types";

interface IBehaviorProps {
  behaviorData: IBehaviorDataType;
}

export default function Behavior({ behaviorData }: IBehaviorProps) {
  const clockColor = useRecoilValue(CCV);
  const language = useRecoilValue(LOV);

  const getPausePercentage = () => {
    const { pauseCount, wholeCount } = behaviorData.finishBehavior;
    if (wholeCount === 0) return "0";

    const ratio = 1 - pauseCount / wholeCount;
    const percentage = Math.floor(ratio * 100).toString();

    return percentage;
  };

  const getMaximumRowDays = () => {
    return behaviorData.daysInARow.maximumDays.toString();
  };

  const getLongestTimingDuration = () => {
    const hour = behaviorData.longestDuration / 1000 / 60 / 60;
    return splitIntAndFloatPartWithFixed(hour, 1);
  };

  return (
    <ContentSection>
      <ContentHeader>
        <h2>{language === "kor" ? "행동 분석" : "Behaviors"}</h2>
        <h3>
          {language === "kor"
            ? "사용자님은 어떻게 타이머를 사용하였을까요?"
            : "We also collect your timing behaviors."}
        </h3>
      </ContentHeader>
      <ContentBody data-name="behavior">
        <ValueItem>
          <ValueDisplayer testColor={clockColor}>
            <span className="big">{getPausePercentage()}</span>
            <span className="small">%</span>
          </ValueDisplayer>
          <ValueInfo>
            {language === "kor" ? "설정한 시간을" : "Finish timing"}
            <br />
            {language === "kor" ? "완료한 비율" : "without pause"}
          </ValueInfo>
        </ValueItem>
        <ValueItem>
          <ValueDisplayer testColor={clockColor}>
            <span className="big">{getMaximumRowDays()}</span>
          </ValueDisplayer>
          <ValueInfo>
            {language === "kor" ? "최대 연속 일 수" : "Maximum days"}
            <br />
            {language === "kor" ? "" : "in a row"}
          </ValueInfo>
        </ValueItem>
        <ValueItem>
          <ValueDisplayer testColor={clockColor}>
            <span className="big">{getLongestTimingDuration()?.int}</span>
            <span className="mid">{getLongestTimingDuration()?.float}</span>
            <span className="small">H</span>
          </ValueDisplayer>
          <ValueInfo>
            {language === "kor"
              ? "가장 길게 사용한 시간"
              : "Longest timing duration"}
          </ValueInfo>
        </ValueItem>
      </ContentBody>
    </ContentSection>
  );
}
