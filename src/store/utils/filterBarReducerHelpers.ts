import {
  NestedCheckBoxSection,
  ChildCheckboxObject,
} from 'libs/reuse/components/NestedCheckBoxList/interfaces/NestedCheckboxSection';
import { EMPTY_NESTED_CHECKBOX_SECTION, TEMP_CHECKBOX_KEY } from 'store/consts/consts';
import {
  AppliedFilters,
  CheckboxDropdownState,
  CheckBoxDropdownKey,
  FilterBarState,
} from 'store/interfaces/FilterBarState';

const getFilteredItemsFromNestedCheckboxes = (
  checkboxes: NestedCheckBoxSection[],
): string[] => {
  return (
    checkboxes
      // flatten the array to an array of just children
      .map((checkbox: NestedCheckBoxSection): ChildCheckboxObject[] => [
        ...checkbox.childObjects,
      ])
      .flat(1)
      // filter out the unchecked items
      .filter((childObject: ChildCheckboxObject) => !childObject.checked)
      .map((checkedObject: ChildCheckboxObject) => checkedObject.childId)
  );
};

export const getCurrentCheckboxState = (
  state: Draft<FilterBarState>,
  dropdownKey: CheckBoxDropdownKey,
): CheckboxDropdownState => {
  return state[dropdownKey];
};

export const getFiltersFromState = (savedState: {
  startDate: string | undefined;
  endDate: string | undefined;
  categories: Draft<NestedCheckBoxSection>[];
  accounts: Draft<NestedCheckBoxSection>[];
}): AppliedFilters => {
  const { startDate, endDate, categories, accounts } = savedState;

  // opportunity to factor out get nested chexkboxes function?
  const filteredCategories = getFilteredItemsFromNestedCheckboxes(categories);
  const filteredAccounts = getFilteredItemsFromNestedCheckboxes(accounts);

  return {
    startDate,
    endDate,
    filteredCategories,
    filteredAccounts,
  };
};

export const setAllCheckboxesHelper = (
  currentBoxes: NestedCheckBoxSection[],
  value: boolean,
): NestedCheckBoxSection[] => {
  return currentBoxes.map((section: NestedCheckBoxSection) => {
    return {
      ...section,
      checked: value,
      childObjects: section.childObjects.map((object: ChildCheckboxObject) => {
        return {
          ...object,
          checked: value,
        };
      }),
    };
  });
};

/**
 * Sets the 'checked' value of all childObjects to the argued value 'value'
 *
 * @param childObjects
 * @param newParentValue
 * @returns
 */
export const setAllChildren = (
  childObjects: ChildCheckboxObject[],
  value: boolean,
): ChildCheckboxObject[] => {
  return childObjects.map((childObject: ChildCheckboxObject) => {
    return {
      ...childObject,
      checked: value,
    };
  });
};

/**
 *
 * @param {*} state
 * @param {*} parentName
 * @param {*} key
 * @returns
 */
export const findParentCheckbox = (
  dropdownState: CheckboxDropdownState,
  parentId: string,
): NestedCheckBoxSection => {
  const currrentSections = dropdownState[TEMP_CHECKBOX_KEY];
  return (
    currrentSections.find((section) => section.parentId === parentId) ??
    EMPTY_NESTED_CHECKBOX_SECTION
  );
};

export const findChildCheckboxByParent = (
  parent: NestedCheckBoxSection,
  childId: string,
): ChildCheckboxObject => {
  return parent.childObjects.find(
    (e: ChildCheckboxObject) => e.childId === childId,
  ) as ChildCheckboxObject;
};

export const toggleCheckboxValue = (
  checkbox: NestedCheckBoxSection | ChildCheckboxObject,
): boolean => {
  return !checkbox.checked;
};
