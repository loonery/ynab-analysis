import { ReactNode } from 'react';

// defines the custom toggle element that acts as a dropdown toggle
export interface CustomToggleProps {
  children: ReactNode;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  show: boolean;
}

export interface CustomMenuProps {
  children: ReactNode;
  style: React.CSSProperties;
  className?: string;
}

export interface CustomDropdownProps {
  dropdownLinkText: string;
  id: string;
  onToggle: () => void;
  show: boolean;
  children: ReactNode;
}

export interface ButtonProps {
  label: string | number | React.JSX.Element;
  onClick: () => void;
  classString?: string;
}

export interface ButtonBarProps {
  buttons: ButtonProps[];
  justify?: string;
  padding?: string;
}
