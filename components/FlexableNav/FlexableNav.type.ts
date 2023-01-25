export interface IFlexableNavItemStyleProps {
  isFlexed: boolean;
  position: "left" | "right";
  canHover: boolean;
  isTransitioning: boolean;
}

export interface IFlexableNavItemProps {
  position: "left" | "right";
  title: React.ReactNode;
  description: string;
  flexedIcon: React.ReactNode;
  isFlexed: boolean;
  activeColor?: string;
  onFlexedClick?: () => void;
  onFlexingEnd?: () => void;
}

export interface IFlexableNavProps {
  children: React.ReactNode;
}
