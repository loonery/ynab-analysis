
export const getFiltersFromState = (savedState) => {
    const { startDate, endDate, categories, accounts} = savedState;
    
    // retrieve all the cateogories 
    const filteredCategories = categories.map(
        (checkbox) => [...checkbox.subCategoryObjects]).flat(1).filter(
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
    const newBoxes = currentBoxes.map((section) => {
        return (
            {
                ...section,
                checked: value,
                subCategoryObjects: section.subCategoryObjects.map(
                    (object) => {
                        return {
                            ...object, 
                            checked: value
                        }
                    })
            }
        )
    })
    return newBoxes;
}

export const setAllChildren = (parent, newParentValue) => {
    const newSubcategoryObjects = parent.subCategoryObjects.map(
        (childObject) => {
            return {
                ...childObject, 
                checked: newParentValue
            }
    });
    return newSubcategoryObjects;
}

export const findParentCheckbox = (state, categoryGroupName) => {
    const currrentSections = state.categoryDropdown.tempCategoryCheckBoxes;
    const matchedSection = currrentSections.find(
        section => section.categoryGroupName === categoryGroupName);
    return matchedSection;
}

export const findChildCheckboxByParent = (parent, childName) => {
    return parent.subCategoryObjects.find(
        e => e.subCategoryName === childName);
}

export const toggleCheckboxValue = (checkbox) => {
    const newValue = !checkbox.checked;
    return newValue;
}