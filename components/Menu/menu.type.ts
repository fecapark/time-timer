import React from "react";

export interface IItemDrawerStyleProps {
  itemCount: number;
  isOpened: boolean;
}

export interface ISelectableItemProps {
  content: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
}

export interface IItemDrawerProps {
  icon?: React.ReactNode;
  content: string;
  children: React.ReactNode;
}

export interface IHeadDrawerItemProps {
  icon: React.ReactNode;
  content: React.ReactNode;
  selected?: boolean;
  onClick?: React.MouseEventHandler;
}
