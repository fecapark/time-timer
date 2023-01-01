import { useRecoilState, useRecoilValue } from "recoil";
import useIsomorphicEffect from "../../../../hooks/useIsomorphicEffect";
import useOptionStorage from "../../../../hooks/useOptionStorage";
import { FadeFromRightAnimationCSS } from "../MobileMenu.styled";
import {
  languageOptionValueAtom as LOV,
  clockColorValueAtom as CCV,
  progressUnitValueAtom as PUV,
} from "../../../../shared/atom";
import { ItemDrawer, SelectableItem } from "../../menu";
import { Theme } from "../../../../styles/theme";
import { ColorThumbnail } from "../../menu.styled";
import { ClockColorType } from "../../../../shared/types";

export default function DisplayMenuContent() {
  const language = useRecoilValue(LOV);
  const [clockColor, setClockColor] = useRecoilState(CCV);
  const [progressUnit, setProgressUnit] = useRecoilState(PUV);
  const [optionValue, setOptionStorageValue, canAccessToOptionStorage] =
    useOptionStorage();

  useIsomorphicEffect(() => {
    if (!canAccessToOptionStorage) return;
    setClockColor(optionValue.clockColor);
    setProgressUnit(optionValue.progressUnit);
  }, [optionValue, canAccessToOptionStorage]);

  return (
    <div css={FadeFromRightAnimationCSS}>
      <ItemDrawer content={language === "kor" ? "색상" : "Color"}>
        {Object.entries(Theme.clock.color).map(([colorName, value]) => {
          return (
            <SelectableItem
              key={value}
              content={<ColorThumbnail color={value} />}
              selected={clockColor === colorName}
              onClick={() => {
                setOptionStorageValue({
                  clockColor: colorName as ClockColorType,
                });
              }}
            />
          );
        })}
      </ItemDrawer>
      <ItemDrawer content={language === "kor" ? "시간 단위" : "Progress"}>
        <SelectableItem
          content={
            language === "kor" ? "분과 초로 나타내기" : "Show as min/sec"
          }
          selected={progressUnit === "time"}
          onClick={() => {
            setOptionStorageValue({ progressUnit: "time" });
          }}
        />
        <SelectableItem
          content={
            language === "kor" ? "백분위로 나타내기" : "Show as percentage"
          }
          selected={progressUnit === "percentage"}
          onClick={() => {
            setOptionStorageValue({ progressUnit: "percentage" });
          }}
        />
      </ItemDrawer>
    </div>
  );
}
