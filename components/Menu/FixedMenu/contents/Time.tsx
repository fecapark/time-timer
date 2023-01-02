import { ItemDrawer, SelectableItem } from "../../menu";
import { FadeContentAnimationCSS } from "../FixedMenu.styled";
import {
  languageOptionValueAtom as LOV,
  maxClockTimeAtom as MCT,
} from "../../../../shared/atom";
import { useRecoilState, useRecoilValue } from "recoil";
import { maxClockTimes } from "../../../../shared/const";
import useOptionStorage from "../../../../hooks/useOptionStorage";
import useIsomorphicEffect from "../../../../hooks/useIsomorphicEffect";

/*

1. 최대 시간 설정
2. 회전시 틱당 시간 설정

*/

export default function TimeSectionContent() {
  const language = useRecoilValue(LOV);
  const [maxClockTime, setMaxClockTime] = useRecoilState(MCT);
  const [optionValue, setOptionStorageValue, canAccessToOptionStorage] =
    useOptionStorage();

  useIsomorphicEffect(() => {
    if (!canAccessToOptionStorage) return;
    setMaxClockTime(optionValue.maxClockTime);
  }, [optionValue, canAccessToOptionStorage]);

  return (
    <div css={FadeContentAnimationCSS}>
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
        <></>
      </ItemDrawer>
    </div>
  );
}
