import React from 'react';

import { FlexContainer } from 'libs/reuse/containers/FlexContainer';

import {
  FLOATING_SELECT_CLASS_STRING,
  FLOATING_SELECT_CONTAINER_CLASS_STRING,
} from '../consts/consts';
import { AllowedValueTypes, RuntimeSelectProps } from '../interfaces/interfaces';
import { OptionInterface, isAllowed } from '../interfaces/interfaces';
import { StyledSelect, Label, Option } from '../styles/elementStyles';

// eslint-disable-next-line
const Select = <Value,>({
  selectLabel = 'default',
  id = 'default-id',
  options = [],
  value,
  onChange,
  selectContainerProps = { className: '' },
  selectElementProps = { className: '' },
  isFloatingSelect = false,
  mapValueToAllowedType,
}: RuntimeSelectProps<Value>) => {
  // function ensures that all values are of the allowed type for the select
  const toValue = (option: Value): AllowedValueTypes => {
    if (mapValueToAllowedType) {
      return mapValueToAllowedType(option);
    }
    return isAllowed(option) ? option : String(option);
  };

  // if values fed to dropdown are not of the allowed type, we convert them
  const mapOptionsToAllowedOptions = (
    options: OptionInterface<Value>[],
  ): OptionInterface<AllowedValueTypes>[] => {
    return options.map((option) => {
      return { ...option, value: toValue(option.value) };
    });
  };
  const allowedOptions = mapOptionsToAllowedOptions(options);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const option = options[e.target.selectedIndex];
    onChange(option?.value);
  };

  const { className: selectContainerClassName = '' } = selectContainerProps;
  const { className: selectElementClassname = '' } = selectContainerProps;

  return (
    <FlexContainer
      {...selectContainerProps}
      key={id}
      className={
        isFloatingSelect
          ? `${FLOATING_SELECT_CONTAINER_CLASS_STRING} ${selectContainerClassName}`
          : selectContainerClassName
      }
    >
      <StyledSelect
        {...selectElementProps}
        id={id}
        className={
          isFloatingSelect
            ? `${FLOATING_SELECT_CLASS_STRING} ${selectContainerClassName}`
            : selectElementClassname
        }
        value={toValue(value)}
        onChange={handleChange}
      >
        {allowedOptions.map(
          (option: OptionInterface<AllowedValueTypes>, index: number) => (
            <Option key={index} value={option?.value}>
              {option?.label}
            </Option>
          ),
        )}
      </StyledSelect>
      <Label htmlFor={id}>{selectLabel}</Label>
    </FlexContainer>
  );
};
export default Select;
