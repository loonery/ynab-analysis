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

const Select = styled.select`
  width: 100%;
`;

const SelectElement = ({ label, id, options }) => {
  return (
    <Container>
      <Label htmlFor={id}>{label}</Label>
      <Select id={id} className={SELECT_ELEMENT_CLASS_STRING}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </Container>
  );
};

export default SelectElement;
