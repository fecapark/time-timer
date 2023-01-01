import React from "react";
import { MenuContentType } from "../../../shared/types";

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

export interface IContentHeaderProps {
  icon: React.ReactNode;
  onIconClick: () => void;
}

export interface IMenuContentLinkerProps {
  content: React.ReactNode;
  linkTo: MenuContentType;
}
