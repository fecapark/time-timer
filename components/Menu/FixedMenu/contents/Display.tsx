import { useRecoilValue, useSetRecoilState } from "recoil";
import { ClockColorType } from "../../../../shared/types";
import { Theme } from "../../../../styles/theme";
import { ItemDrawer, SelectableItem } from "../../menu";
import { ColorThumbnail } from "../../menu.styled";
import {
  languageOptionValueAtom as LOV,
  clockColorValueAtom as CCV,
  progressUnitValueAtom as PUV,
} from "../../../../shared/atom";
import { FadeContentAnimationCSS } from "../FixedMenu.styled";
import { useOptionQuery } from "../../menu.util";

export default function DisplaySectionContent() {
  const language = useRecoilValue(LOV);
  const setClockColor = useSetRecoilState(CCV);
  const setProgressUnit = useSetRecoilState(PUV);

  const {
    isLoading,
    data: optionData,
    mutate,
  } = useOptionQuery({
    clockColor: setClockColor,
    progressUnit: setProgressUnit,
  });

  return (
    <div css={FadeContentAnimationCSS}>
      <ItemDrawer content={language === "kor" ? "색상" : "Color"}>
        {Object.entries(Theme.clock.color).map(([colorName, value]) => {
          return (
            <SelectableItem
              key={value}
              isLoading={isLoading}
              content={<ColorThumbnail color={value} />}
              selected={optionData?.clockColor === colorName}
              onClick={() => {
                mutate({
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
          selected={optionData?.progressUnit === "time"}
          onClick={() => {
            mutate({ progressUnit: "time" });
          }}
        />
        <SelectableItem
          content={
            language === "kor" ? "백분위로 나타내기" : "Show as percentage"
          }
          selected={optionData?.progressUnit === "percentage"}
          onClick={() => {
            mutate({ progressUnit: "percentage" });
          }}
        />
      </ItemDrawer>
    </div>
  );
}
