import { useRecoilState, useRecoilValue } from "recoil";
import { ContentTitle, FadeFromRightAnimationCSS } from "../MobileMenu.styled";
import {
  languageOptionValueAtom as LOV,
  clockColorValueAtom as CCV,
  progressUnitValueAtom as PUV,
} from "../../../../shared/atom";
import { ItemDrawer, SelectableItem } from "../../menu";
import { Theme } from "../../../../styles/theme";
import { ColorThumbnail } from "../../menu.styled";
import { ClockColorType } from "../../../../shared/types";
import { useOptionQuery } from "../../menu.util";

export default function DisplayMenuContent() {
  const language = useRecoilValue(LOV);
  const [clockColor, setClockColor] = useRecoilState(CCV);
  const [progressUnit, setProgressUnit] = useRecoilState(PUV);

  const { mutate } = useOptionQuery({
    clockColor: setClockColor,
    progressUnit: setProgressUnit,
  });

  return (
    <div css={FadeFromRightAnimationCSS}>
      <ContentTitle>
        <span className="title">{language === "kor" ? "화면" : "Display"}</span>
      </ContentTitle>
      <ItemDrawer content={language === "kor" ? "색상" : "Color"}>
        {Object.entries(Theme.clock.color).map(([colorName, value]) => {
          return (
            <SelectableItem
              key={value}
              content={<ColorThumbnail color={value} />}
              selected={clockColor === colorName}
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
          selected={progressUnit === "time"}
          onClick={() => {
            mutate({ progressUnit: "time" });
          }}
        />
        <SelectableItem
          content={
            language === "kor" ? "백분위로 나타내기" : "Show as percentage"
          }
          selected={progressUnit === "percentage"}
          onClick={() => {
            mutate({ progressUnit: "percentage" });
          }}
        />
      </ItemDrawer>
    </div>
  );
}
