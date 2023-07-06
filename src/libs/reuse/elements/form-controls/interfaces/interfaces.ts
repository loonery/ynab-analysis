export interface CheckboxProps {
  id: string;
  label: string;
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

export interface SelectProps<Value> {
  id: string;
  selectLabel: string;
  options: OptionInterface<Value>[];
  value: Value;
  onChange: (newValue: Value) => void;
  selectElementClassname?: string;
  selectContainerClassName?: string;
  isFloatingSelect?: boolean;
  mapValueToAllowedType?: (option: Value) => AllowedValueTypes;
}
export type RuntimeSelectProps<Value> = Value extends AllowedValueTypes
  ? SelectProps<Value>
  : Required<SelectProps<Value>> & {
      selectElementClassname?: string;
      selectContainerClassName?: string;
    };

// type guard function checks value and refines type
export const isAllowed = (v: any): v is AllowedValueTypes =>
  typeof v === 'string' || typeof v === 'number';
