import React from 'react';

import { FlexContainer } from '../containers/FlexContainer';
import { StyledButton } from '../elements/form-controls/components/StyledButton';

import { DEFAULT_BUTTON_CLASS_STRING } from './consts/consts';
import { Button, ButtonBarProps } from './interfaces/interfaces';

// eslint-disable-next-line
const ButtonBar = ({ buttons, justify, padding }: ButtonBarProps) => {
  return (
    <FlexContainer padding={padding} justify={justify}>
      {buttons.map((button: Button, index) => {
        const { label, onClick, classString } = button;
        return (
          <StyledButton
            key={`button ${index}`}
            className={classString ? classString : DEFAULT_BUTTON_CLASS_STRING}
            onClick={onClick}
          >
            {label}
          </StyledButton>
        );
      })}
    </FlexContainer>
  );
};
export default ButtonBar;
