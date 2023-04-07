import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Fragment } from 'react';

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 20px; 
`;

const StyledButton = styled.button`
  margin-right: 10px;
`;

const buttonClassString = 'btn btn-primary'
const ButtonBarFooter = ({ buttons }) => {
  console.log(buttons);
  return (
    <Fragment>
      <ButtonContainer>
        {buttons.map((button) => (
          <StyledButton 
            key={button.label} 
            onClick={button.onClick} 
            className={button.classString ? button.classString : buttonClassString}
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