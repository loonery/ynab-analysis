import React from "react";
import PropTypes from 'prop-types'
import styled from "styled-components"

import { 
    DEFAULT_BUTTON_CLASS_STRING,
    DROPDOWN_DIV_CLASSNAME,
    DROPDOWN_MENU_CLASSNAME, 
    DROPDOWN_TOGGLE_CLASSNAME
} from "consts/consts";

const StyledDropdown = styled.div`
    /* padding top, bottom | left right */
    padding: 20px 20px;
`;

export const Dropdown = ({dropdownLinkText, id, children}) => {

    const className = DEFAULT_BUTTON_CLASS_STRING + ' ' + DROPDOWN_TOGGLE_CLASSNAME;
    return (
        <div className={DROPDOWN_DIV_CLASSNAME}>
            <button 
                className={className} 
                type="button"
                id={id} 
                data-bs-toggle="dropdown"
                data-bs-auto-close="false"
            >
                {dropdownLinkText}
            </button>
            <StyledDropdown className={DROPDOWN_MENU_CLASSNAME}>
                {children}
            </StyledDropdown>
        </div>
    )
}

Dropdown.propTypes = {
    dropdownLinkText: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

