import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DEFAULT_BUTTON_CLASS_STRING } from '../../../consts/consts';

const ButtonContainer = styled.div`
  display: flex;
  justify-content: ${props => props.justify ? props.justify : 'start'};
`;

const StyledButton = styled.button`
  margin-right: 10px;
`;

const ButtonBar = ({ buttons, justify, className}) => {
  return (
    <ButtonContainer 
      className={className} 
      justify={justify}
    >
      {buttons.map((button) => (
        <StyledButton 
          key={button.label} 
          onClick={button.onClick} 
          className={button.classString ? button.classString : DEFAULT_BUTTON_CLASS_STRING}
        >
          {button.label}
        </StyledButton>
      ))}
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
};

export default ButtonBar;