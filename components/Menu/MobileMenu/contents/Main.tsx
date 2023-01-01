import { MdArrowForward, MdOpenInNew } from "react-icons/md";
import { useRecoilState, useSetRecoilState } from "recoil";
import useIsomorphicEffect from "../../../../hooks/useIsomorphicEffect";
import useModal from "../../../../hooks/useModal";
import useOptionStorage from "../../../../hooks/useOptionStorage";
import PreviewSoundModal from "../../../Modal/contents/PreviewSoundModal/PreviewSoundModal";
import SupportingInfoModal from "../../../Modal/contents/SupportingInfoModal/SupportingInfoModal";
import { ItemDrawer, SelectableItem } from "../../menu";
import { ItemContainer, OpenLink } from "../../menu.styled";
import { FadeFromLeftAnimationCSS } from "../MobileMenu.styled";
import {
  IMenuContentLinkerProps,
  IOpenLinkItemProps,
} from "../MobileMenu.type";
import {
  mobileMenuContentAtom as MMC,
  languageOptionValueAtom as LOV,
} from "../../../../shared/atom";

function OpenLinkItem({ content, href }: IOpenLinkItemProps) {
  return (
    <ItemContainer>
      <OpenLink href={href} target="_blank" rel="noopener noreferrer">
        <span>{content}</span>
        <MdOpenInNew />
      </OpenLink>
    </ItemContainer>
  );
}

function MenuContentLinker({ content, linkTo }: IMenuContentLinkerProps) {
  const setMenuContent = useSetRecoilState(MMC);

  const switchContent = () => {
    setMenuContent(linkTo);
  };

  return (
    <ItemContainer onClick={switchContent}>
      <span>{content}</span>
      <MdArrowForward />
    </ItemContainer>
  );
}

export default function MainMenuContent({
  closeMenu,
}: {
  closeMenu: () => void;
}) {
  const [language, setLanguage] = useRecoilState(LOV);
  const setSupportModalActive = useModal({
    title:
      language === "kor"
        ? "백그라운드 푸쉬 알림 지원을 확인하세요"
        : "Check background push notification supports",
    content: <SupportingInfoModal notSupport={false} />,
  });
  const setPreviewSoundModalActive = useModal({
    title:
      language === "kor"
        ? "알람 소리를 미리 들어보세요"
        : "Preview alarm sound before start",
    content: <PreviewSoundModal />,
  });

  const [optionValue, setOptionStorageValue, canAccessToOptionStorage] =
    useOptionStorage();

  useIsomorphicEffect(() => {
    if (!canAccessToOptionStorage) return;
    setLanguage(optionValue.language);
  }, [optionValue, canAccessToOptionStorage]);

  return (
    <div css={FadeFromLeftAnimationCSS}>
      <ItemDrawer content={language === "kor" ? "언어" : "Language"}>
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
      </ItemDrawer>
      <MenuContentLinker
        content={language === "kor" ? "화면" : "Display"}
        linkTo="display"
      />
      <ItemDrawer content={language === "kor" ? "알림" : "Notification"}>
        <SelectableItem
          content={
            language === "kor" ? "알람 소리 미리 듣기" : "Preview alarm sound"
          }
          onClick={() => {
            closeMenu();
            setPreviewSoundModalActive(true);
          }}
        />
        <SelectableItem
          content={
            language === "kor"
              ? "백그라운드 푸쉬 알림 지원"
              : "About push notification"
          }
          onClick={() => {
            closeMenu();
            setSupportModalActive(true);
          }}
        />
      </ItemDrawer>

      <div style={{ margin: "24px 0" }} />
      <OpenLinkItem content="Time Timer" href="https://www.timetimer.com" />
      <OpenLinkItem
        content="Github"
        href="https://github.com/fecapark/time-timer"
      />
    </div>
  );
}
