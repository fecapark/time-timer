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
  content: string;
  children: React.ReactNode;
}

export interface IHeadDrawerItemProps {
  content: React.ReactNode;
  selected?: boolean;
  onClick?: React.MouseEventHandler;
}
