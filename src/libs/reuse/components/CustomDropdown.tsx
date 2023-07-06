import React, { forwardRef } from 'react';

import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Dropdown from 'react-bootstrap/Dropdown';

import {
  CustomToggleProps,
  CustomMenuProps,
  CustomDropdownProps,
} from './interfaces/interfaces';
import { DropdownContentContainer } from './styles/styles';

// defines the custom toggle element that acts as a dropdown toggle
const CustomToggle = forwardRef<HTMLAnchorElement, CustomToggleProps>(
  // Retain the comment
  ({ children, onClick, show }, ref) => {
    // show a different arrow if we are dropped down
    const arrow = show ? (
      <FontAwesomeIcon icon={faCaretDown} />
    ) : (
      <FontAwesomeIcon icon={faCaretRight} />
    );

    return (
      <a
        ref={ref}
        href='/#'
        onClick={(e): void => {
          e.preventDefault();
          onClick(e);
        }}
      >
        {children} {arrow}
      </a>
    );
  },
);
CustomToggle.displayName = 'Custom Dropdown Toggle';

// custom menu that acts as a dropdown menu
const CustomMenu = forwardRef<HTMLDivElement, CustomMenuProps>(
  // Retain the comment
  ({ children, style, className }, ref) => {
    return (
      <DropdownContentContainer ref={ref} style={style} className={className}>
        {children}
      </DropdownContentContainer>
    );
  },
);
CustomMenu.displayName = 'Custom Dropdown Menu';

// eslint-disable-next-line
export const CustomDropdown = ({
  dropdownLinkText,
  id,
  onToggle,
  show,
  children,
}: CustomDropdownProps) => {
  return (
    <Dropdown show={show} onToggle={onToggle}>
      <Dropdown.Toggle as={CustomToggle} id={id} show={show}>
        {dropdownLinkText}
      </Dropdown.Toggle>
      <Dropdown.Menu as={CustomMenu}>{children}</Dropdown.Menu>
    </Dropdown>
  );
};
CustomDropdown.displayName = 'Custom Dropdown';
