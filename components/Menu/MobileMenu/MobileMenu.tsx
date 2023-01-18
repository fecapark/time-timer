import React, { useEffect } from "react";
import { MdArrowBack, MdMenuOpen } from "react-icons/md";
import { useRecoilState } from "recoil";
import useMediaMatch from "../../../hooks/useMediaMatch";
import {
  isActiveMenuAtom as IAM,
  mobileMenuContentAtom as MMC,
} from "../../../shared/atom";
import { MenuContentType } from "../../../shared/types";
import { Theme } from "../../../styles/theme";
import { ActionIconWrapper } from "../menu.styled";
import DisplayMenuContent from "./contents/Display";
import MainMenuContent from "./contents/Main";
import TimeMenuContent from "./contents/Time";
import {
  Background,
  ContentHeaderContainer,
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
    time: {
      header: <ContentHeader icon={<MdArrowBack />} onIconClick={goMainMenu} />,
      content: <TimeMenuContent />,
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
