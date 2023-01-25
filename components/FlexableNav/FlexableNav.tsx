import React from "react";
import { useRecoilState } from "recoil";
import { onFlexableNavTransitionAtom as OFNT } from "../../shared/atom";
import {
  ContentContainer,
  FlexableNavContainer,
  FlexableNavItemContainer,
} from "./FlexableNav.styled";
import { IFlexableNavItemProps, IFlexableNavProps } from "./FlexableNav.type";

export function FlexableNavItem({
  title,
  description,
  flexedIcon,
  isFlexed,
  activeColor,
  position,
  onFlexedClick = () => {},
  onFlexingEnd = () => {},
}: IFlexableNavItemProps) {
  const [isTransitioning, setIsTransitioning] = useRecoilState(OFNT);

  const onSwitchTransitionEnd = (e: React.TransitionEvent) => {
    if (!isTransitioning) return;
    if (e.propertyName !== "width") return;

    setIsTransitioning(false);
    onFlexingEnd();
  };

  const onSwitchClick = () => {
    if (!isFlexed) return;
    if (isTransitioning) return;

    setIsTransitioning(true);

    requestAnimationFrame(() => {
      onFlexedClick();
    });
  };

  return (
    <FlexableNavItemContainer
      isFlexed={isFlexed}
      onClick={onSwitchClick}
      position={position}
      style={{
        backgroundColor: !isFlexed ? activeColor : "",
      }}
      canHover={!isTransitioning}
      isTransitioning={isTransitioning}
      onTransitionEnd={onSwitchTransitionEnd}
    >
      {isFlexed ? (
        <>
          <div className="icon-wrapper">{flexedIcon}</div>
          <div className="section-info">{title}</div>
        </>
      ) : (
        <ContentContainer>
          <h1>{title}</h1>
          <h3>{description}</h3>
        </ContentContainer>
      )}
    </FlexableNavItemContainer>
  );
}

export default function FlexableNav({ children }: IFlexableNavProps) {
  return <FlexableNavContainer>{children}</FlexableNavContainer>;
}
