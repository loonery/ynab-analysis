import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const filterBarSlice = createSlice({
    name: 'filterBar',
    initialState: {
        categoryDropdown: {
            checkBoxSections: []
        },
        dateDropdown: {},
        accountDropdown: {},
        startDate: undefined, 
        endDate: undefined,
        filteredCategories: [],
        filteredAccounts: []
    },
    reducers: {
        // used to populate the state with checkboxes for the categories that are found in transactions
        addCheckBoxSection(state, action) {
            const categoryGroupName = action.payload.categoryGroupName;
            const currentSections = state.categoryDropdown.checkBoxSections;
            const matchedNames = currentSections.find(section => section.categoryGroupName === categoryGroupName);

            // we don't want to add duplicate sections that might be added due to several render cycles
            if (!matchedNames) {
                state.categoryDropdown.checkBoxSections.push(action.payload);
            }
        },
        // toggles category group checkboxes
        toggleParentCategory(state, action) {
            // get the data of the parent that was just checked
            const categoryGroupName = action.payload;
            const currrentSections = state.categoryDropdown.checkBoxSections;
            const matchedSection = currrentSections.find(section => section.categoryGroupName === categoryGroupName);
            
            // toggle the parent's check value
            const newParentValue = !matchedSection.checked;
            matchedSection.checked = newParentValue;

            // all subcategories take on the value of their parent's new check value
            const newSubcategoryObjects = matchedSection.subCategoryObjects.map((childObject) => {
                return {
                    ...childObject, 
                    checked: newParentValue
                }
            });
            matchedSection.subCategoryObjects = newSubcategoryObjects;
        },
        // toggles subcategory checkboxes when clicked
        toggleChildCategory(state, action) {

            const { categoryGroupName, subCategoryName } = action.payload;
            const currrentSections = state.categoryDropdown.checkBoxSections;
            const matchedSection = currrentSections.find(x => x.categoryGroupName === categoryGroupName);

            const newSubcategoryObjects = matchedSection.subCategoryObjects.map((childObject) => {
                // ternary either toggles the child that was clicked or returns the original object
                const newChild = (childObject.subCategoryName === subCategoryName) 
                    ? {...childObject, checked: !childObject.checked} 
                    : {...childObject}

                
                return newChild;
            });
            matchedSection.subCategoryObjects = newSubcategoryObjects;
        },
        addToCategoryFilter(state, action) {
            state.filteredCategories.add(action.payload);
        },
        removeFromCategoryFilter(state, action) {
            state.filteredCategories.delete(action.payload);
        },
    }
});

export const {
    addCheckBoxSection,
    toggleParentCategory,
    toggleChildCategory
} = filterBarSlice.actions;
export const filterBarReducer = filterBarSlice.reducer;