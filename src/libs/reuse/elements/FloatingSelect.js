import React from 'react';

import {
  FLOATING_SELECT_CLASS_STRING,
  FLOATING_SELECT_CONTAINER_CLASS_STRING,
} from 'libs/consts/reuseConsts';
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
  overflow-y: auto;
`;

const Option = styled.option`
  overflow-y: scroll;
`;

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
FloatingSelect.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
