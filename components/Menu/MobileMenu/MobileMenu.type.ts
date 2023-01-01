import React from "react";
import { MenuContentType } from "../../../shared/types";

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
