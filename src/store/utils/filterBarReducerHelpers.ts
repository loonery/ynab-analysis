import { Draft } from '@reduxjs/toolkit';
import {
  NestedCheckBoxSection,
  ChildCheckboxObject,
} from 'libs/reuse/components/NestedCheckBoxList/interfaces/NestedCheckboxSection';
import { EMPTY_NESTED_CHECKBOX_SECTION } from 'store/consts/consts';
import {
  AppliedFilters,
  CheckboxDropdownState,
  DropdownKey,
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
  dropdownKey: DropdownKey,
): Draft<CheckboxDropdownState> => {
  return state[dropdownKey] as Draft<CheckboxDropdownState>;
};

export const getFiltersFromState = (savedState): AppliedFilters => {
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
  const newChildObjects = childObjects.map((childObject: ChildCheckboxObject) => {
    return {
      ...childObject,
      checked: value,
    };
  });
  return newChildObjects;
};

/**
 *
 * @param {*} state
 * @param {*} parentName
 * @param {*} key
 * @returns
 */
export const findParentCheckbox = (
  dropdownState: Draft<CheckboxDropdownState>,
  parentId: string,
): NestedCheckBoxSection => {
  const currrentSections = dropdownState.tempCheckBoxes;
  return (
    currrentSections.find((section) => section.parentId === parentId) ??
    EMPTY_NESTED_CHECKBOX_SECTION
  );
};

export const findChildCheckboxByParent = (parent, childName) => {
  return parent.childObjects.find((e) => e.childName === childName);
};

export const toggleCheckboxValue = (
  checkbox: NestedCheckBoxSection | ChildCheckboxObject,
): boolean => {
  const newValue = !checkbox.checked;
  return newValue;
};
