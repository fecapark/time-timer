import React, { useEffect } from "react";
import { MdArrowBack, MdMenuOpen } from "react-icons/md";
import { useRecoilState, useRecoilValue } from "recoil";
import useIsomorphicEffect from "../../../hooks/useIsomorphicEffect";
import useMediaMatch from "../../../hooks/useMediaMatch";
import useOptionStorage from "../../../hooks/useOptionStorage";
import {
  isActiveMenuAtom as IAM,
  languageOptionValueAtom as LOV,
  clockColorValueAtom as CCV,
  progressUnitValueAtom as PUV,
  mobileMenuContentAtom as MMC,
} from "../../../shared/atom";
import { ClockColorType, MenuContentType } from "../../../shared/types";
import { Theme } from "../../../styles/theme";
import { ItemDrawer, SelectableItem } from "../menu";
import { ActionIconWrapper, ColorThumbnail } from "../menu.styled";
import DisplayMenuContent from "./contents/Display";
import MainMenuContent from "./contents/Main";
import {
  Background,
  ContentHeaderContainer,
  FadeFromRightAnimationCSS,
  MenuContainer,
  MenuContentContainer,
} from "./MobileMenu.styled";
import { IContentHeaderProps, IMenuContentValue } from "./MobileMenu.type";

function ContentHeader({ icon, onIconClick }: IContentHeaderProps) {
  return (
    <ContentHeaderContainer>
      <ActionIconWrapper onClick={onIconClick}>{icon}</ActionIconWrapper>
    </ContentHeaderContainer>
  );
}

export default function MobileMenu() {
  const [isActive, setIsActive] = useRecoilState(IAM);
  const [menuContent, setMenuContent] = useRecoilState(MMC);
  const [isHideTimer] = useMediaMatch(Theme.mediaQueries.hideTimerMaxWidth);

  const closeMenu = () => {
    setIsActive(false);
  };

  const goMainMenu = () => {
    setMenuContent("main");
  };

  const contents: Record<MenuContentType, IMenuContentValue> = {
    main: {
      header: <ContentHeader icon={<MdMenuOpen />} onIconClick={closeMenu} />,
      content: <MainMenuContent closeMenu={closeMenu} />,
    },
    display: {
      header: <ContentHeader icon={<MdArrowBack />} onIconClick={goMainMenu} />,
      content: <DisplayMenuContent />,
    },
  };

  useEffect(() => {
    goMainMenu();
    closeMenu();
  }, [isHideTimer]);

  return (
    <MenuContainer isActive={isActive}>
      <Background isActive={isActive} onClick={closeMenu} />
      <MenuContentContainer isActive={isActive}>
        {contents[menuContent].header}
        <div className="content">{contents[menuContent].content}</div>
        {menuContent === "main" ? (
          <div className="footer">
            <span>
              Copyright &copy; 2022 Sanghyeok Park.
              <br />
              All rights reserved.
            </span>
          </div>
        ) : null}
      </MenuContentContainer>
    </MenuContainer>
  );
}
