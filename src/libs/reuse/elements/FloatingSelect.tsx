import React from 'react';

import {
  FLOATING_SELECT_CLASS_STRING,
  FLOATING_SELECT_CONTAINER_CLASS_STRING,
} from './consts/consts';
import { Container, StyledSelect, Option, Label } from './styles/elementStyles';

const FloatingSelect = ({ label, id, options, onChange, value }) => {
  return (
    <Container className={FLOATING_SELECT_CONTAINER_CLASS_STRING}>
      <StyledSelect
        id={id}
        className={FLOATING_SELECT_CLASS_STRING}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <Option key={option} value={option}>
            {option}
          </Option>
        ))}
      </StyledSelect>
      <Label htmlFor={id}>{label}</Label>
    </Container>
  );
};
export default FloatingSelect;
