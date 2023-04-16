
export const getFiltersFromState = (savedState) => {
    const { startDate, endDate, categories, accounts} = savedState;
    
    // retrieve all the cateogories 
    // opportunity to factor out get nested chexkboxes function?
    const filteredCategories = categories.map(
        (checkbox) => [...checkbox.childObjects]).flat(1).filter(
            (subCategoryObject) => !subCategoryObject.checked
        ).map(
            (checkedObject) => checkedObject.subCategoryName
        );
    
    const filteredAccounts = [];
    const newActiveFilters = {
        startDate,
        endDate, 
        filteredCategories,
        filteredAccounts
    }
    return newActiveFilters;
}

export const setAllCheckboxes = (currentBoxes, value) => {
    const newBoxes = currentBoxes.map(
        (section) => {
            return (
                {
                    ...section,
                    checked: value,
                    childObjects: section.childObjects.map((object) => {
                        return {
                            ...object, 
                            checked: value
                        }
                    })
                }
            )
        }
    )
    return newBoxes;
}

export const setAllChildren = (parent, newParentValue) => {
    const newChildObjects = parent.childObjects.map(
        (childObject) => {
            return {
                ...childObject, 
                checked: newParentValue
            }
    });
    return newChildObjects;
}

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
        section => section.parentName === parentName);
    return matchedSection;
}

export const findChildCheckboxByParent = (parent, childName) => {
    return parent.childObjects.find(
        e => e.childName === childName);
}

export const toggleCheckboxValue = (checkbox) => {
    const newValue = !checkbox.checked;
    return newValue;
}