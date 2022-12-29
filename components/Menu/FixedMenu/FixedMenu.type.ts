export interface IItemProps {
  icon: React.ReactNode;
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

export type MenuSectionType = "language" | "color" | "notification";
