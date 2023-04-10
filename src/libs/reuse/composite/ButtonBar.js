import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Fragment } from 'react';
import { DEFAULT_BUTTON_CLASS_STRING } from '../../../consts/consts';

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 20px; 
`;

const StyledButton = styled.button`
  margin-right: 10px;
`;


const ButtonBarFooter = ({ buttons }) => {
  return (
    <Fragment>
      <ButtonContainer>
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
    </Fragment>
  );
};

ButtonBarFooter.propTypes = {
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
      classString: PropTypes.string
    })
  ).isRequired,
};

export default ButtonBarFooter;