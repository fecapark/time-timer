import { MdAllInbox, MdArrowForward, MdOpenInNew } from "react-icons/md";
import { useRecoilState, useSetRecoilState } from "recoil";
import useModal from "../../../../hooks/useModal";
import PreviewSoundModal from "../../../Modal/contents/PreviewSoundModal/PreviewSoundModal";
import SupportingInfoModal from "../../../Modal/contents/SupportingInfoModal/SupportingInfoModal";
import { ItemDrawer, SelectableItem } from "../../menu";
import { ItemContainer, OpenLink } from "../../menu.styled";
import {
  FadeFromLeftAnimationCSS,
  RouterItemContainer,
} from "../MobileMenu.styled";
import {
  IMenuContentLinkerProps,
  IOpenLinkItemProps,
  IRouterItemProps,
} from "../MobileMenu.type";
import {
  mobileMenuContentAtom as MMC,
  languageOptionValueAtom as LOV,
} from "../../../../shared/atom";
import { BsGithub } from "react-icons/bs";
import { useOptionQuery } from "../../menu.util";
import Link from "next/link";

function OpenLinkItem({
  icon = <MdOpenInNew />,
  content,
  href,
}: IOpenLinkItemProps) {
  return (
    <ItemContainer>
      <OpenLink href={href} target="_blank" rel="noopener noreferrer">
        <span>{content}</span>
        {icon}
      </OpenLink>
    </ItemContainer>
  );
}

function RouterItem({ href, text }: IRouterItemProps) {
  return (
    <Link
      href={href}
      style={{ textDecoration: "none", WebkitTapHighlightColor: "transparent" }}
    >
      <RouterItemContainer>
        <span>{text}</span>
        <MdAllInbox />
      </RouterItemContainer>
    </Link>
  );
}

function MenuContentLinker({
  icon = null,
  content,
  linkTo,
}: IMenuContentLinkerProps) {
  const setMenuContent = useSetRecoilState(MMC);

  const switchContent = () => {
    setMenuContent(linkTo);
  };

  return (
    <ItemContainer onClick={switchContent}>
      <div className="info">
        {icon}
        <span>{content}</span>
      </div>
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
        ? "??????????????? ?????? ?????? ????????? ???????????????"
        : "Check background push notification supports",
    content: <SupportingInfoModal notSupport={false} />,
  });
  const setPreviewSoundModalActive = useModal({
    title:
      language === "kor"
        ? "?????? ????????? ?????? ???????????????"
        : "Preview alarm sound before start",
    content: <PreviewSoundModal />,
  });

  const { mutate } = useOptionQuery({
    language: setLanguage,
  });

  return (
    <div css={FadeFromLeftAnimationCSS}>
      <RouterItem
        text={language === "kor" ? "??????" : "Records"}
        href="/records"
      />
      <div style={{ margin: "24px 0" }} />

      <MenuContentLinker
        content={language === "kor" ? "??????" : "Time"}
        linkTo="time"
      />
      <MenuContentLinker
        content={language === "kor" ? "??????" : "Display"}
        linkTo="display"
      />
      <ItemDrawer content={language === "kor" ? "??????" : "Language"}>
        <SelectableItem
          content="?????????"
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
      </ItemDrawer>
      <ItemDrawer content={language === "kor" ? "??????" : "Notification"}>
        <SelectableItem
          content={
            language === "kor" ? "?????? ?????? ?????? ??????" : "Preview alarm sound"
          }
          onClick={() => {
            closeMenu();
            setPreviewSoundModalActive(true);
          }}
        />
        <SelectableItem
          content={
            language === "kor"
              ? "??????????????? ?????? ?????? ??????"
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
        icon={<BsGithub />}
        content="Github"
        href="https://github.com/fecapark/time-timer"
      />
    </div>
  );
}
