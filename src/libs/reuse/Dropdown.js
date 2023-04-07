import styled from "styled-components"

export const Dropdown = ({dropdownLinkText, id, children}) => {
    
    const StyledDropdown = styled.div`
        /* padding top, bottom | left right */
        padding: 20px 20px;
    `;

    return (
        <div className="dropdown show">
                <a 
                    className="dropdown-toggle" 
                    href="/#" 
                    role="button" 
                    id={id} 
                    data-toggle="dropdown"
                    data-bs-auto-close="false" 
                >
                    {dropdownLinkText}
                </a>
                <StyledDropdown className="dropdown-menu">
                    {children}
                </StyledDropdown>
            </div>
    )
}
