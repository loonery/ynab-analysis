import React, { ChangeEvent } from 'react';

import {
  CHECKBOX_INPUT_CLASSNAME,
  CHECKBOX_INPUT_TYPE,
  CHECKBOX_LABEL_CLASSNAME,
  CHECKBOX_DIV_CLASSNAME,
} from '../consts/consts';
import { CheckboxProps } from '../interfaces/interfaces';
import { Label, StyledInput } from '../styles/elementStyles';

// eslint-disable-next-line
export const Checkbox = ({
  labelText: labelText,
  checked = false,
  onChange,
  id,
}: CheckboxProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newValue = e.target.value === 'true' ? true : false;
    onChange(newValue);
  };
  return (
    <div key={id} className={CHECKBOX_DIV_CLASSNAME}>
      <StyledInput
        className={CHECKBOX_INPUT_CLASSNAME}
        type={CHECKBOX_INPUT_TYPE}
        id={id}
        checked={checked}
        onChange={handleChange}
      />
      <Label className={CHECKBOX_LABEL_CLASSNAME} htmlFor={id}>
        {labelText}
      </Label>
    </div>
  );
};
