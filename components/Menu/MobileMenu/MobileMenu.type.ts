import React from "react";

export interface IItemDrawerStyleProps {
  itemCount: number;
  isOpened: boolean;
}

export interface IItemDrawerProps {
  content: string;
  children: React.ReactNode;
}

export interface IItemProps {
  content: React.ReactNode;
  selected?: boolean;
  onClick?: React.MouseEventHandler;
}

export interface IOpenLinkItemProps {
  content: React.ReactNode;
  href: string;
}

export interface IMenuContentValue {
  header: React.ReactNode;
  content: React.ReactNode;
}
