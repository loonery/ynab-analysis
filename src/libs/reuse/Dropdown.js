import React from "react";
import PropTypes from 'prop-types'
import styled from "styled-components"

import { 
    DROPDOWN_DIV_CLASSNAME,
    DROPDOWN_MENU_CLASSNAME, 
    DROPDOWN_TOGGLE_CLASSNAME
} from "../../consts/consts";

const StyledDropdown = styled.div`
    /* padding top, bottom | left right */
    padding: 20px 20px;
`;

export const Dropdown = ({dropdownLinkText, id, children}) => {
    return (
        <div className={DROPDOWN_DIV_CLASSNAME}>
            <a 
                className={DROPDOWN_TOGGLE_CLASSNAME} 
                href={'/#'} 
                role={'button'}
                id={id} 
                data-toggle={dropdown}
                data-bs-auto-close={false} 
            >
                {dropdownLinkText}
            </a>
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