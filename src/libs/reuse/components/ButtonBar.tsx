import React from 'react';

import { FlexContainer } from '../containers/FlexContainer';
import { StyledButton } from '../elements/form-controls/components/StyledButton';

import { DEFAULT_BUTTON_CLASS_STRING } from './consts/consts';
import { ButtonProps, ButtonBarProps } from './interfaces/interfaces';

// eslint-disable-next-line
const ButtonBar = ({ buttons, gapBetweenButtons, justify, padding }: ButtonBarProps) => {
  return (
    <FlexContainer padding={padding} gap={gapBetweenButtons ?? 5} justify={justify}>
      {buttons.map((button: ButtonProps, index) => {
        const { label, onClick, classString } = button;
        return (
          <StyledButton
            key={`button-${index}`}
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
