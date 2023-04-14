import { check } from "prettier"

export const getCategoryFiltersFromState = (state) => {
        
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