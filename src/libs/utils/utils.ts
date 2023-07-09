import { CategoryGroup, SubCategory } from 'interfaces/Category';
import { AllowedValueTypes } from 'libs/reuse/elements/form-controls/interfaces/interfaces';
import { OptionInterface } from 'libs/reuse/elements/form-controls/interfaces/interfaces';

export const getOptionsFromValues = <T>(
  values: T[],
  mapValueToAllowedType: (value: T) => AllowedValueTypes = (value): string =>
    String(value),
  mapValueToId: (value: T) => string = (value): string => String(value),
  mapValueTolabel: (value: T) => string = (value): string => String(value),
): OptionInterface<AllowedValueTypes>[] => {
  return values.map((value: T) => {
    const convertedValue = mapValueToAllowedType(value);
    const id = mapValueToId(value);
    const label = mapValueTolabel(value);
    return { value: convertedValue, id, label };
  });
};

export const mapCategoryValueToAllowedType = (
  value: SubCategory | CategoryGroup,
): string => value.id;
export const mapCategoryValueToId = (value: SubCategory | CategoryGroup): string =>
  value.id;
export const mapCategoryValueToLabel = (value: SubCategory | CategoryGroup): string =>
  value.name;
export const getSelectedValue = (
  selectedOption: OptionInterface<AllowedValueTypes>,
): AllowedValueTypes => selectedOption.value;
