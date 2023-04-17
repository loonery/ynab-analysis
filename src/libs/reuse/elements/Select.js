import React from "react";
import { SELECT_ELEMENT_CLASS_STRING } from "libs/consts/reuseConsts";

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  margin-right: 10px;
  font-weight: 600px;
`;

const StyledSelect = styled.select`
  width: 100%;
`;

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
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </StyledSelect>
    </Container>
  );
};
export default Select;
