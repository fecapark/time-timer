import React from "react";

export interface IItemProps {
  defaultIcon: React.ReactNode;
  selectedIcon?: React.ReactNode;
  text: string;
  selected?: boolean;
  onClick?: () => void;
}

export interface IOpenLinkItemProps {
  icon: React.ReactNode;
  text: string;
  href: string;
}

export interface ISliderItemProps {
  content: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
}

export interface ISliderContainerStyleProps {
  active: boolean;
  triggerInteractionHide: boolean;
}

export interface ISliderProps {
  children: React.ReactNode;
  onClose: () => void;
}

export interface IItemDrawerProps {
  content: React.ReactNode;
  children: React.ReactNode;
}

export type MenuSectionType = "time" | "language" | "display" | "notification";
