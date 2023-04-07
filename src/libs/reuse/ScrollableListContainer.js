import styled from "styled-components";

export const ScrollableListContainer = ({children}) => {
    
    // defines the container that holds the scrollable content
    const ScrollableListContainer = styled.div`
        max-height: 200px;
        width: max-content;
        overflow: auto;
        padding: 6px;
        border: 1px solid gray;
        border-color: rgb(200, 200, 200); /* Match the <hr> tag's color */
        border-radius: 5px;
    `
    
    return (
        <ScrollableListContainer>
            {children}
        </ScrollableListContainer>
    );
}