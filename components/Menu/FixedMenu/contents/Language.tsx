import { useRecoilState } from "recoil";
import { SelectableItem } from "../../menu";
import { languageOptionValueAtom as LOV } from "../../../../shared/atom";
import useOptionStorage from "../../../../hooks/useOptionStorage";
import useIsomorphicEffect from "../../../../hooks/useIsomorphicEffect";
import { FadeContentAnimationCSS } from "../FixedMenu.styled";

export default function LanguageSectionContent() {
  const [language, setLanguage] = useRecoilState(LOV);
  const [optionValue, setOptionStorageValue, canAccessToOptionStorage] =
    useOptionStorage();

  useIsomorphicEffect(() => {
    if (!canAccessToOptionStorage) return;
    setLanguage(optionValue.language);
  }, [optionValue, canAccessToOptionStorage]);

  return (
    <div css={FadeContentAnimationCSS}>
      <SelectableItem
        content="한국어"
        selected={language === "kor"}
        onClick={() => {
          setOptionStorageValue({ language: "kor" });
        }}
      />
      <SelectableItem
        content="English"
        selected={language === "en"}
        onClick={() => {
          setOptionStorageValue({ language: "en" });
        }}
      />
    </div>
  );
}
