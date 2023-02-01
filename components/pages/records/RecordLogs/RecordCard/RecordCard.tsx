import { useRecoilValue } from "recoil";
import { IRecordCardProps } from "./RecordCard.type";
import {
  languageOptionValueAtom as LOV,
  clockColorValueAtom as CCV,
} from "../../../../../shared/atom";
import { getDayGapBetween } from "../../../../../utils/time";
import { CardContainer } from "./RecordCard.styled";
import { Theme } from "../../../../../styles/theme";
import { RiFlag2Fill } from "react-icons/ri";
import { getDateString } from "./RecordCard.util";

export default function RecordCard({
  duration,
  endTime,
  paused,
  completeRatio,
}: IRecordCardProps) {
  const language = useRecoilValue(LOV);
  const clockColor = useRecoilValue(CCV);

  const getMinSec = () => {
    const min = Math.floor(duration / 1000 / 60).toString();
    const sec = (Math.floor(duration / 1000) % 60).toString();

    return {
      min: min.length < 2 ? `0${min}` : min,
      sec: sec.length < 2 ? `0${sec}` : sec,
    };
  };

  const getCompletePercentage = () => {
    return (Math.floor(completeRatio * 1000) / 10).toFixed(1);
  };

  const getHowMuchDateAgo = () => {
    const dayGap = getDayGapBetween(new Date(), endTime);

    if (dayGap === 0) return language === "kor" ? "오늘" : "Today";
    if (dayGap < 7)
      return language === "kor" ? `${dayGap}일 전` : `${dayGap}d ago`;
    if (dayGap < 30)
      return language === "kor"
        ? `${Math.floor(dayGap / 7)}주 전`
        : `${Math.floor(dayGap / 7)}w ago`;
    if (dayGap < 365)
      return language === "kor"
        ? `${Math.floor(dayGap / 30)}달 전`
        : `${Math.floor(dayGap / 30)}m ago`;
    return language === "kor"
      ? `${Math.floor(dayGap / 365)}년 전`
      : `${Math.floor(dayGap / 365)}y ago`;
  };

  return (
    <CardContainer accentColor={`${Theme.clock.color[clockColor]}`}>
      <div className="time-displayer">
        <div className="min">{getMinSec().min}</div>
        <div className="hr"></div>
        <div className="sec">{getMinSec().sec}</div>
      </div>
      <div className="info-container">
        <div className="date-info">
          <span className="date-ago">{getHowMuchDateAgo()}</span>
          <span className="full-date">{getDateString(endTime, language)}</span>
        </div>
        <div className="pause-info">
          {paused ? (
            <div className="percentage">{getCompletePercentage()}</div>
          ) : (
            <div className="goal">
              <RiFlag2Fill />
            </div>
          )}
        </div>
      </div>
    </CardContainer>
  );
}
