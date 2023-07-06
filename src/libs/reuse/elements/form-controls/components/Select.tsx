import React from 'react';

import {
  FLOATING_SELECT_CLASS_STRING,
  FLOATING_SELECT_CONTAINER_CLASS_STRING,
} from '../consts/consts';
import { AllowedValueTypes, RuntimeSelectProps } from '../interfaces/interfaces';
import { OptionInterface, isAllowed } from '../interfaces/interfaces';
import { Container, StyledSelect, Label, Option } from '../styles/elementStyles';

// eslint-disable-next-line
const Select = <Value,>({
  selectLabel = 'default',
  id = 'default-id',
  options = [],
  value,
  onChange,
  selectContainerClassName = '',
  selectElementClassname = '',
  isFloatingSelect = false,
  mapValueToAllowedType,
}: RuntimeSelectProps<Value>) => {
  // these are optional props, but if they are included they may not be undefined
  if (
    selectContainerClassName === undefined ||
    selectElementClassname === undefined ||
    mapValueToAllowedType === undefined ||
    isFloatingSelect === undefined
  ) {
    throw new Error(
      `if provided, optional properties may not be undefined but were argued as 
      selectContainerClassName: ${selectContainerClassName}, 
      selectElementClassname: ${selectElementClassname},
      mapValueToAllowedType: ${mapValueToAllowedType}`,
    );
  }

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

  return (
    <Container
      key={id}
      className={
        isFloatingSelect
          ? FLOATING_SELECT_CONTAINER_CLASS_STRING + selectContainerClassName
          : selectContainerClassName
      }
    >
      <Label htmlFor={id}>{selectLabel}</Label>
      <StyledSelect
        id={id}
        className={
          isFloatingSelect
            ? FLOATING_SELECT_CLASS_STRING + selectContainerClassName
            : selectContainerClassName
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
    </Container>
  );
};
export default Select;
