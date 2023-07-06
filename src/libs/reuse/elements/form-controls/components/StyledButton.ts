import styled from 'styled-components';

interface StyledButtonProps {
  margin?: string;
  padding?: string;
}

export const StyledButton = styled.button<StyledButtonProps>`
  margin-right: ${(props): string => (props.margin ? props.margin : '0px')};
  padding: ${(props): string => (props.padding ? props.padding : '10px 20px')};
`;
