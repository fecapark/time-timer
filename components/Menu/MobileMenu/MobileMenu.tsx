import React, { useEffect } from "react";
import { MdArrowBack, MdMenuOpen } from "react-icons/md";
import { useRecoilState, useSetRecoilState } from "recoil";
import useIsomorphicEffect from "../../../hooks/useIsomorphicEffect";
import useMediaMatch from "../../../hooks/useMediaMatch";
import useOptionStorage from "../../../hooks/useOptionStorage";
import {
  languageOptionValueAtom as LOV,
  clockColorValueAtom as CCV,
  progressUnitValueAtom as PUV,
  maxClockTimeAtom as MCT,
  clockTimeUnitAtom as CTU,
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
  const setLanguage = useSetRecoilState(LOV);
  const setClockColor = useSetRecoilState(CCV);
  const setProgressUnit = useSetRecoilState(PUV);
  const setMaxClockTime = useSetRecoilState(MCT);
  const setClockTimeUnit = useSetRecoilState(CTU);
  const [isActive, setIsActive] = useRecoilState(IAM);
  const [menuContent, setMenuContent] = useRecoilState(MMC);
  const [isHideTimer] = useMediaMatch(Theme.mediaQueries.hideTimerMaxWidth);
  const [optionValue, _, canAccessToOptionStorage] = useOptionStorage();

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

  useIsomorphicEffect(() => {
    if (!canAccessToOptionStorage) return;
    setLanguage(optionValue.language);
    setClockColor(optionValue.clockColor);
    setProgressUnit(optionValue.progressUnit);
    setMaxClockTime(optionValue.maxClockTime);
    setClockTimeUnit(optionValue.clockTimeUnit);
  }, [optionValue, canAccessToOptionStorage]);

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
