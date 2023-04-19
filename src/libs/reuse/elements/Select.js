import React from 'react';

import { SELECT_ELEMENT_CLASS_STRING } from 'libs/consts/reuseConsts';
import PropTypes from 'prop-types';
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
  max-height: 30px;
  overflow-y: auto;
`;

const Option = styled.option`
  overflow-y: scroll;
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
          <Option key={option} value={option}>
            {option}
          </Option>
        ))}
      </StyledSelect>
    </Container>
  );
};
export default Select;
Select.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
