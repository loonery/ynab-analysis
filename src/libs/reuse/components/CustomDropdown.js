import React from "react";
import PropTypes from 'prop-types'
import Dropdown from "react-bootstrap/Dropdown";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";

const DropdownContentContainer = styled.div`
    /* padding top, bottom | left right */
    padding: 10px 20px;
`;

// defines the custom toggle element that acts as a dropdown toggle
const CustomToggle = React.forwardRef(
  ({ children, onClick }, ref) => (
    <a
      href="/#"
      ref={ref}
      onClick={(e) => {
        e.preventDefault(); // prevent navigation of the href
        onClick(e);
      }}
    >
      {children} <FontAwesomeIcon icon={faCaretDown} />
    </a>
));

// custom menu that acts as a dropdown menu
const CustomMenu = React.forwardRef(
  ({ children, style, className }, ref) => {
      return (
          // the dropdown content container inherits the styling of the
          // bootstrap dropdown menu via a ref
          <DropdownContentContainer
            ref={ref}
            style={style}
            className={className}
          >
            { children }
          </DropdownContentContainer>
      );
    },
  );

export const CustomDropdown = ({ 
  dropdownLinkText, 
  id, 
  onToggle,
  show, 
  children
}) => {
  return (
    <Dropdown show={show} onToggle={onToggle}>
        <Dropdown.Toggle as={CustomToggle} id={id}>
            {dropdownLinkText}
        </Dropdown.Toggle>
        <Dropdown.Menu as={CustomMenu}>
            {children}
        </Dropdown.Menu>
    </Dropdown>
    )
}

CustomDropdown.propTypes = {
  dropdownLinkText: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  showAction: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};