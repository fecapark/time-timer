import { useRecoilState, useRecoilValue } from "recoil";
import useIsomorphicEffect from "../../../../hooks/useIsomorphicEffect";
import useOptionStorage from "../../../../hooks/useOptionStorage";
import {
  languageOptionValueAtom as LOV,
  maxClockTimeAtom as MCT,
  clockTimeUnitAtom as CTU,
} from "../../../../shared/atom";
import { clockTimeUnits, maxClockTimes } from "../../../../shared/const";
import { ItemDrawer, SelectableItem } from "../../menu";
import { ContentTitle, FadeFromRightAnimationCSS } from "../MobileMenu.styled";

export default function TimeMenuContent() {
  const language = useRecoilValue(LOV);
  const [maxClockTime, setMaxClockTime] = useRecoilState(MCT);
  const [clockTimeUnit, setClockTimeUnit] = useRecoilState(CTU);
  const [optionValue, setOptionStorageValue, canAccessToOptionStorage] =
    useOptionStorage();

  useIsomorphicEffect(() => {
    if (!canAccessToOptionStorage) return;
    setClockTimeUnit(optionValue.clockTimeUnit);
    setMaxClockTime(optionValue.maxClockTime);
  }, [optionValue, canAccessToOptionStorage]);

  return (
    <div css={FadeFromRightAnimationCSS}>
      <ContentTitle>
        <span className="title">{language === "kor" ? "시간" : "Time"}</span>
      </ContentTitle>
      <ItemDrawer
        content={language === "kor" ? "최대 시간 설정" : "Set maximum time"}
      >
        {maxClockTimes.map((aTime) => {
          const isOverHour = aTime >= 60;
          const time = isOverHour ? Math.round(aTime / 60) : aTime;
          const unit =
            language === "kor"
              ? isOverHour
                ? "시간"
                : "분"
              : isOverHour
              ? "hours"
              : "mins";

          return (
            <SelectableItem
              key={aTime}
              content={`${time} ${
                language === "en" && time === 1
                  ? unit.slice(0, unit.length - 1)
                  : unit
              }`}
              selected={aTime === maxClockTime}
              onClick={() => {
                setOptionStorageValue({ maxClockTime: aTime });
              }}
            />
          );
        })}
      </ItemDrawer>
      <ItemDrawer
        content={
          language === "kor"
            ? "회전당 시간 간격 설정"
            : "Set interval per rotation"
        }
      >
        {clockTimeUnits.map((aTimeUnit) => {
          const isOverMin = aTimeUnit >= 60;
          const time = isOverMin ? Math.round(aTimeUnit / 60) : aTimeUnit;
          const unit =
            language === "kor"
              ? isOverMin
                ? "분"
                : "초"
              : isOverMin
              ? "mins"
              : "secs";

          return (
            <SelectableItem
              key={aTimeUnit}
              content={`${time} ${
                language === "en" && time === 1
                  ? unit.slice(0, unit.length - 1)
                  : unit
              }`}
              selected={aTimeUnit === clockTimeUnit}
              onClick={() => {
                setOptionStorageValue({ clockTimeUnit: aTimeUnit });
              }}
            />
          );
        })}
      </ItemDrawer>
    </div>
  );
}
