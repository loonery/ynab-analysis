const getFiltersFromNestedCheckboxes = (checkboxes) => {
  return checkboxes
    .map((checkbox) => [...checkbox.childObjects])
    .flat(1)
    .filter((childObject) => !childObject.checked)
    .map((checkedObject) => checkedObject.childName);
};

export const getFiltersFromState = (savedState) => {
  const { startDate, endDate, categories, accounts } = savedState;

  // opportunity to factor out get nested chexkboxes function?
  const filteredCategories = getFiltersFromNestedCheckboxes(categories);
  const filteredAccounts = getFiltersFromNestedCheckboxes(accounts);

  const newActiveFilters = {
    startDate,
    endDate,
    filteredCategories,
    filteredAccounts,
  };
  return newActiveFilters;
};

export const setAllCheckboxes = (currentBoxes, value) => {
  const newBoxes = currentBoxes.map((section) => {
    return {
      ...section,
      checked: value,
      childObjects: section.childObjects.map((object) => {
        return {
          ...object,
          checked: value,
        };
      }),
    };
  });
  return newBoxes;
};

export const setAllChildren = (parent, newParentValue) => {
  const newChildObjects = parent.childObjects.map((childObject) => {
    return {
      ...childObject,
      checked: newParentValue,
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
export const findParentCheckbox = (state, parentName, keys) => {
  const { dropdownKey, tempCheckboxKey } = keys;
  const currrentSections = state[dropdownKey][tempCheckboxKey];
  const matchedSection = currrentSections.find(
    (section) => section.parentName === parentName,
  );
  return matchedSection;
};

export const findChildCheckboxByParent = (parent, childName) => {
  return parent.childObjects.find((e) => e.childName === childName);
};

export const toggleCheckboxValue = (checkbox) => {
  const newValue = !checkbox.checked;
  return newValue;
};
