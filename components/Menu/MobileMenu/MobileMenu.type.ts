import React from "react";
import { MenuContentType } from "../../../shared/types";

export interface IOpenLinkItemProps {
  icon?: React.ReactNode;
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
  icon?: React.ReactNode;
  content: React.ReactNode;
  linkTo: MenuContentType;
}

export interface IRouterItemProps {
  href: string;
  text: string;
}
