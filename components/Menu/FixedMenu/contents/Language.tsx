import { useRecoilState } from "recoil";
import { SelectableItem } from "../../menu";
import { languageOptionValueAtom as LOV } from "../../../../shared/atom";
import { FadeContentAnimationCSS } from "../FixedMenu.styled";
import { useOptionQuery } from "../../menu.util";

export default function LanguageSectionContent() {
  const [language, setLanguage] = useRecoilState(LOV);
  const { mutate } = useOptionQuery({
    language: setLanguage,
  });

  return (
    <div css={FadeContentAnimationCSS}>
      <SelectableItem
        content="한국어"
        selected={language === "kor"}
        onClick={() => {
          mutate({ language: "kor" });
        }}
      />
      <SelectableItem
        content="English"
        selected={language === "en"}
        onClick={() => {
          mutate({ language: "en" });
        }}
      />
    </div>
  );
}
