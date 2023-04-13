import { createSlice } from "@reduxjs/toolkit";
import { CATEGORY_FILTER_DROPDOWN_ID } from "consts/consts";
import { closeDropdown } from "libs/utils/closeDropdown";

const filterBarSlice = createSlice({
    name: 'filterBar',
    initialState: {
        categoryDropdown: {
            // Each object in the array looks like...
            // {
            //     categoryGroupName: String,
            //     checked: Boolean
            //     subCategoryObjects: [{checkboxObject}, {...}, {...}],
            // }
            categoryCheckBoxes: [],
            tempCategoryCheckBoxes: [],
            dropped: false,
        },
        activeFilters : {
            startDate: undefined, 
            endDate: undefined,
            filteredCategories: [],
            filteredAccounts: []
        }
    },
    reducers: {
        // used to populate the state with checkboxes for the categories that are found in transactions
        addCheckBoxSection(state, action) {
            const categoryGroupName = action.payload.categoryGroupName;
            const currentSections = state.categoryDropdown.categoryCheckBoxes;
            const matchedNames = currentSections.find(section => section.categoryGroupName === categoryGroupName);

            // we don't want to add duplicate sections that might be added due to several render cycles
            if (!matchedNames) {
                // load the temp version and the saved version at first
                state.categoryDropdown.categoryCheckBoxes.push(action.payload);
                state.categoryDropdown.tempCategoryCheckBoxes.push(action.payload);
            }
        },
        // toggles category group checkboxes
        toggleParentCategory(state, action) {
            // get the data of the parent that was just checked
            const categoryGroupName = action.payload;
            const currrentSections = state.categoryDropdown.tempCategoryCheckBoxes;
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
            const currrentSections = state.categoryDropdown.tempCategoryCheckBoxes;
            const matchedSection = currrentSections.find(x => x.categoryGroupName === categoryGroupName);

            const newSubcategoryObjects = matchedSection.subCategoryObjects.map((childObject) => {
                // ternary either toggles the child that was clicked or returns the original object
                const newChild = (childObject.subCategoryName === subCategoryName) 
                    ? {...childObject, checked: !childObject.checked} 
                    : {...childObject}
                return newChild;
            });
            matchedSection.subCategoryObjects = newSubcategoryObjects;

            // determine whether all children are checked
            const allChildrenChecked = matchedSection.subCategoryObjects.every(e => e.checked);
            const noChildrenChecked = matchedSection.subCategoryObjects.every(e => !e.checked);

            // check or uncheck the parent depending on the value of its children
            if (allChildrenChecked) 
            {matchedSection.checked = true;} 
            else if (noChildrenChecked) 
            {matchedSection.checked = false;}

        },
        selectAllCategories(state, action) {
            const currrentSections = state.categoryDropdown.tempCategoryCheckBoxes;
            const newSections = currrentSections.map((section) => {
                return (
                    {
                        ...section,
                        checked: true,
                        subCategoryObjects: section.subCategoryObjects.map((object) => {return {...object, checked: true}})
                    }
                )
            })
            state.categoryDropdown.tempCategoryCheckBoxes = newSections;
            
        },
        selectNoCategories(state, action) {
            const currrentSections = state.categoryDropdown.tempCategoryCheckBoxes;
            const newSections = currrentSections.map((section) => {
                return (
                    {
                        ...section,
                        checked: false,
                        subCategoryObjects: section.subCategoryObjects.map((object) => {return {...object, checked: false}})
                    }
                )
            })
            state.categoryDropdown.tempCategoryCheckBoxes = newSections;
        },
        setFilteredCategories(state, action) {
            // temp checkbox state now becomes saved checkbox state
            const newCheckboxState = state.categoryDropdown.tempCategoryCheckBoxes
            state.categoryDropdown.categoryCheckBoxes = newCheckboxState;
            
            // filters are gleaned from new checkbox state
            const filteredCategories = newCheckboxState.filter((category) => !category.checked);
            state.activeFilters.filteredCategories = filteredCategories;
        },
        cancelFilteredCategoriesChanges(state, action) {
            // the temporary state reverts to the saved state
            state.categoryDropdown.tempCategoryCheckBoxes = state.categoryDropdown.categoryCheckBoxes;
            // closeDropdown(CATEGORY_FILTER_DROPDOWN_ID);
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
    toggleChildCategory,
    selectAllCategories,
    selectNoCategories,
    setFilteredCategories,
    cancelFilteredCategoriesChanges
} = filterBarSlice.actions;
export const filterBarReducer = filterBarSlice.reducer;