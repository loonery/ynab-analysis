import React from 'react';

import { SELECT_ELEMENT_CLASS_STRING } from './consts/consts';
import { Container, StyledSelect, Label, Option } from './styles/elementStyles';

const Select = ({ label, id, options, onChange, value }) => {
  return (
    <Container>
      <Label htmlFor={id}>{label}</Label>
      <StyledSelect
        id={id}
        className={SELECT_ELEMENT_CLASS_STRING}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <Option key={option} value={option}>
            {option}
          </Option>
        ))}
      </StyledSelect>
    </Container>
  );
};
export default Select;
