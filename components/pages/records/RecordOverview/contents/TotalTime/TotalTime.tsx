import { useQuery } from "@tanstack/react-query";
import { useMemo, useRef } from "react";
import { useRecoilValue } from "recoil";
import {
  getTimeRecordsFromDB,
  TIME_RECORD_DB_KEY,
} from "../../../../../../hooks/useIDB";
import useViewportCollision from "../../../../../../hooks/useViewportCollision";
import {
  languageOptionValueAtom as LOV,
  clockColorValueAtom as CCV,
} from "../../../../../../shared/atom";
import { ITimeRecordDataType } from "../../../../../../shared/types";
import { getDayGapBetween } from "../../../../../../utils/time";
import {
  ContentBody,
  ContentHeader,
  ContentSection,
  ValueDisplayer,
  ValueInfo,
  ValueItem,
} from "../../RecordOverview.styled";
import { splitIntAndFloatPartWithFixed } from "../../RecordOverview.util";

interface ITotalTimeProps {
  timeRecordsData: Array<ITimeRecordDataType>;
}

export default function TotalTime({ timeRecordsData }: ITotalTimeProps) {
  const fadeRef = useRef<HTMLDivElement>(null);
  const language = useRecoilValue(LOV);
  const clockColor = useRecoilValue(CCV);
  const { collide, scrolled } = useViewportCollision({
    ref: fadeRef,
    threshold: 0.2,
    rootMargin: "0 0 -80px 0",
  });

  const getReducedDurations = () => {
    const durationSums = {
      today: 0,
      week: 0,
      month: 0,
      all: 0,
    };

    timeRecordsData?.forEach((aRecord) => {
      const dayGapWithRecord = getDayGapBetween(aRecord.endTime, new Date());

      if (dayGapWithRecord < 30) durationSums.month += aRecord.duration;
      if (dayGapWithRecord < 7) durationSums.week += aRecord.duration;
      if (dayGapWithRecord === 0) durationSums.today += aRecord.duration;
      durationSums.all += aRecord.duration;
    });

    return durationSums;
  };

  const durationSums = useMemo(() => {
    function parseMSToH(ms: number) {
      return ms / 1000 / 60 / 60;
    }

    const durationSums = getReducedDurations();

    return {
      today: splitIntAndFloatPartWithFixed(parseMSToH(durationSums.today), 1),
      week: splitIntAndFloatPartWithFixed(parseMSToH(durationSums.week), 1),
      month: splitIntAndFloatPartWithFixed(parseMSToH(durationSums.month), 1),
      all: splitIntAndFloatPartWithFixed(parseMSToH(durationSums.all), 1),
    };
  }, [timeRecordsData]);

  return (
    <ContentSection ref={fadeRef} show={collide} scrolled={scrolled}>
      <ContentHeader>
        <h2>{language === "kor" ? "기록된 시간들" : "Total Time"}</h2>
        <h3>
          {language === "kor"
            ? "10분 이상의 기록들만 보여드릴게요."
            : "For only over 10 minutes records."}
        </h3>
      </ContentHeader>
      <ContentBody data-name="total-time">
        <ValueItem data-head="true">
          <ValueDisplayer testColor={clockColor} inHead={true}>
            <span className="big">{durationSums.today.int}</span>
            <span className="mid">{durationSums.today.float}</span>
            <span className="small">H</span>
          </ValueDisplayer>
          <ValueInfo>
            {language === "kor" ? "오늘은 이만큼 하셨어요." : "For today"}
          </ValueInfo>
        </ValueItem>
        <ValueItem>
          <ValueDisplayer testColor={clockColor}>
            <span className="big">{durationSums.week.int}</span>
            <span className="mid">{durationSums.week.float}</span>
            <span className="small">H</span>
          </ValueDisplayer>
          <ValueInfo>
            {language === "kor" ? "최근 7일간" : "For a week"}
          </ValueInfo>
        </ValueItem>
        <ValueItem>
          <ValueDisplayer testColor={clockColor}>
            <span className="big">{durationSums.month.int}</span>
            <span className="mid">{durationSums.month.float}</span>
            <span className="small">H</span>
          </ValueDisplayer>
          <ValueInfo>
            {language === "kor" ? "최근 30일간" : "For a month"}
          </ValueInfo>
        </ValueItem>
        <ValueItem>
          <ValueDisplayer testColor={clockColor}>
            <span className="big">{durationSums.all.int}</span>
            <span className="mid">{durationSums.all.float}</span>
            <span className="small">H</span>
          </ValueDisplayer>
          <ValueInfo>
            {language === "kor" ? "전체 기간동안" : "For whole days"}
          </ValueInfo>
        </ValueItem>
      </ContentBody>
    </ContentSection>
  );
}
