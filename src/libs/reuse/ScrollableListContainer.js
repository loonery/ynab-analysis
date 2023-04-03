import styled from "styled-components";

export const ScrollableListContainer = ({children}) => {
    
    const ScrollableListContainer = styled.div`
        max-height: 200px;
        width: max-content;
        overflow: auto;
        padding: 6px;
    `
    
    return (
        <ScrollableListContainer>
            {children}
        </ScrollableListContainer>
    );
}