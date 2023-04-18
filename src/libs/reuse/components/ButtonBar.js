import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { DEFAULT_BUTTON_CLASS_STRING } from "libs/consts/reuseConsts";

const ButtonContainer = styled.div`
  display: flex;
  padding: ${props => props.padding ? props.padding : "0px"};
  justify-content: ${props => props.justify ? props.justify : "start"};
`;

const StyledButton = styled.button`
  margin-right: 10px;
`;

const ButtonBar = ({ buttons, justify, padding}) => {

  return (
    <ButtonContainer 
      padding={padding}
      justify={justify}>
      {buttons.map((button) => {
        const {label, onClick, classString} = button;
        return (
          <StyledButton 
            key={label} 
            className={classString ? classString : DEFAULT_BUTTON_CLASS_STRING}
            onClick={onClick}>
            {label}
          </StyledButton>
        );})}
    </ButtonContainer>
  );
};

ButtonBar.propTypes = {
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
      classString: PropTypes.string
    })
  ).isRequired,
  justify: PropTypes.string,
  padding: PropTypes.string
};

export default ButtonBar;