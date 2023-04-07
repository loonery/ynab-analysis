import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Fragment } from 'react';

const ButtonContainer = styled.div`
  display: inline-block;
`;

const StyledButton = styled.button`
  margin-right: 10px;
`;

const buttonClassString = 'btn btn-primary'
const ButtonBar = ({ buttons }) => {
  return (
    <Fragment>
      <hr />
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
      <hr />
    </Fragment>
  );
};

ButtonBar.propTypes = {
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
    })
  ).isRequired,
};

export default ButtonBar;