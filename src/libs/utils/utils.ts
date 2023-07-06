import { AllowedValueTypes } from 'libs/reuse/elements/form-controls/interfaces/interfaces';
import { OptionInterface } from 'libs/reuse/elements/form-controls/interfaces/interfaces';

export const getOptionsFromValues = <T extends AllowedValueTypes>(
  values: T[],
  mapValueToId: (value: T) => string = (value): string => String(value),
  mapValueTolabel: (value: T) => string = (value): string => String(value),
): OptionInterface<T>[] => {
  return values.map((value) => {
    const id = mapValueToId(value);
    const label = mapValueTolabel(value);
    return { value, id, label };
  });
};
