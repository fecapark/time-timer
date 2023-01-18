import React, { useState } from "react";
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from "react-icons/md";
import { RotatingLines } from "react-loader-spinner";
import { useRecoilValue } from "recoil";
import { languageOptionValueAtom as LOV } from "../../shared/atom";
import { ItemContainer, ItemDrawerContainer } from "./menu.styled";
import {
  IItemDrawerProps,
  IHeadDrawerItemProps,
  ISelectableItemProps,
} from "./menu.type";

export function SelectableItem({
  content,
  selected = false,
  isLoading = false,
  onClick,
}: ISelectableItemProps) {
  const language = useRecoilValue(LOV);

  return (
    <ItemContainer onClick={onClick}>
      <span>{content}</span>
      {isLoading ? (
        <RotatingLines strokeColor="grey" width="16" />
      ) : selected ? (
        <span style={{ fontSize: 13, fontWeight: 400 }}>
          {language === "kor" ? "사용중" : "Selected"}
        </span>
      ) : null}
    </ItemContainer>
  );
}

function HeadDrawerItem({
  icon,
  content,
  onClick,
  selected = false,
}: IHeadDrawerItemProps) {
  return (
    <ItemContainer onClick={onClick}>
      <div className="info">
        {icon}
        <span>{content}</span>
      </div>
      {selected ? <MdOutlineArrowDropUp /> : <MdOutlineArrowDropDown />}
    </ItemContainer>
  );
}

export function ItemDrawer({
  icon = null,
  content,
  children,
}: IItemDrawerProps) {
  const [isOpened, setIsOpened] = useState(false);

  const toggleDrawer = () => {
    setIsOpened((prev) => !prev);
  };

  return (
    <ItemDrawerContainer
      isOpened={isOpened}
      itemCount={React.Children.count(children)}
    >
      <HeadDrawerItem
        icon={icon}
        content={content}
        selected={isOpened}
        onClick={toggleDrawer}
      />
      <div className="drawer">{children}</div>
    </ItemDrawerContainer>
  );
}
