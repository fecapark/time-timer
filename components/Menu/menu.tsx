import React, { useEffect, useLayoutEffect, useState } from "react";
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from "react-icons/md";
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
  onClick,
}: ISelectableItemProps) {
  const language = useRecoilValue(LOV);

  return (
    <ItemContainer onClick={onClick}>
      <span>{content}</span>
      {selected ? (
        <span style={{ fontSize: 13, fontWeight: 400 }}>
          {language === "kor" ? "사용중" : "Selected"}
        </span>
      ) : null}
    </ItemContainer>
  );
}

function HeadDrawerItem({
  content,
  selected = false,
  onClick,
}: IHeadDrawerItemProps) {
  return (
    <ItemContainer onClick={onClick}>
      <span>{content}</span>
      {selected ? <MdOutlineArrowDropUp /> : <MdOutlineArrowDropDown />}
    </ItemContainer>
  );
}

export function ItemDrawer({ content, children }: IItemDrawerProps) {
  const [isOpened, setIsOpened] = useState(false);

  const toggleDrawer = () => {
    console.log(content);
    setIsOpened((prev) => !prev);
  };

  useEffect(() => {
    console.log(content + "'s isOpened change to:");
    console.log(isOpened);
  }, [isOpened]);

  return (
    <ItemDrawerContainer
      isOpened={isOpened}
      itemCount={React.Children.count(children)}
    >
      <HeadDrawerItem
        content={content}
        selected={isOpened}
        onClick={toggleDrawer}
      />
      <div className="drawer">{children}</div>
    </ItemDrawerContainer>
  );
}
