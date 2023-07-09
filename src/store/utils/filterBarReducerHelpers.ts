import {
  NestedCheckBoxSection,
  ChildCheckboxObject,
} from 'components/FilterBar/components/NestedCheckboxDropdownContainer/NestedCheckBoxList/interfaces/NestedCheckboxSection';
import { TEMP_CHECKBOX_KEY } from 'store/consts/consts';
import { AppliedFilters, CheckboxDropdownState } from 'store/interfaces/FilterBarState';

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

/**
 *
 * @param savedState
 * @returns
 */
export const getFiltersFromState = (savedState: {
  startDate: string | undefined;
  endDate: string | undefined;
  categories: NestedCheckBoxSection[];
  accounts: NestedCheckBoxSection[];
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

/**
 *
 * @param currentBoxes
 * @param value
 * @returns
 */
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
export const setAllChildrenToValue = (
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
  const parentObject = currrentSections.find((section) => section.parentId === parentId);
  if (!parentObject) {
    throw new Error(`Parent checkbox with id ${parentId} not found`);
  }
  return parentObject;
};

/**
 *
 * @param parent
 * @param childId
 * @returns
 */
export const findChildCheckboxByChildId = (
  parent: NestedCheckBoxSection,
  childId: string,
): ChildCheckboxObject => {
  const childObject = parent.childObjects.find(
    (e: ChildCheckboxObject) => e.childId === childId,
  );
  if (!childObject) {
    throw new Error(`Child checkbox with id ${childId} not found`);
  }
  return childObject;
};

/**
 *
 * @param checkbox
 * @returns
 */
export const toggleCheckboxValue = (
  checkbox: NestedCheckBoxSection | ChildCheckboxObject,
): boolean => {
  return !checkbox.checked;
};
