import React from 'react';

import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import PropTypes from 'prop-types';
import Dropdown from 'react-bootstrap/Dropdown';
import styled from 'styled-components';

const DropdownContentContainer = styled.div`
  /* padding top, bottom | left right */
  padding: 10px 20px;
`;

// defines the custom toggle element that acts as a dropdown toggle
const CustomToggle = React.forwardRef(({ children, onClick, show }, ref) => {
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
      onClick={(e) => {
        e.preventDefault(); // prevent navigation of the href
        onClick(e);
      }}
    >
      {children} {arrow}
    </a>
  );
});
CustomToggle.displayName = 'Custom Dropdown Toggle';
CustomToggle.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

// custom menu that acts as a dropdown menu
const CustomMenu = React.forwardRef(({ children, style, className }, ref) => {
  return (
    // the dropdown content container inherits the styling of the
    // bootstrap dropdown menu via a ref
    <DropdownContentContainer ref={ref} style={style} className={className}>
      {children}
    </DropdownContentContainer>
  );
});
CustomMenu.displayName = 'Custom Dropdown Menu';
CustomMenu.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
};

export const CustomDropdown = ({ dropdownLinkText, id, onToggle, show, children }) => {
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
CustomDropdown.propTypes = {
  dropdownLinkText: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};
