import { CSSProperties } from 'react';

import { FlexContainerProps } from 'libs/reuse/containers/FlexContainer';

export interface CheckboxProps {
  id: string;
  labelText: string;
  checked: boolean;
  onChange: (newValue: boolean) => void;
}

/**
 * Select form control types and interfaces
 */
export type AllowedValueTypes = string | number;

export interface OptionInterface<Value> {
  id: string;
  label: string;
  value: Value;
}

export interface SelectElementProps {
  flex?: CSSProperties['flex'];
  className?: string | undefined;
}

export interface SelectProps<Value> {
  id: string;
  selectLabel: string;
  options: OptionInterface<Value>[];
  value: Value;
  onChange: (newValue: Value) => void;
  mapValueToAllowedType?: (option: Value) => AllowedValueTypes;
  isFloatingSelect?: boolean;
  selectElementProps?: SelectElementProps;
  selectContainerProps?: FlexContainerProps;
}

export type RuntimeSelectProps<Value> = Value extends AllowedValueTypes
  ? SelectProps<Value>
  : Required<SelectProps<Value>> & {
      isFloatingSelect?: boolean;
      selectElementProps?: SelectElementProps;
      selectContainerProps?: FlexContainerProps;
    };

// type guard function checks value and refines type
export const isAllowed = (v: any): v is AllowedValueTypes =>
  typeof v === 'string' || typeof v === 'number';
