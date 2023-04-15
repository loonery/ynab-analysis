import { createSlice } from "@reduxjs/toolkit";
import { 
    findChildCheckboxByParent, 
    findParentCheckbox, 
    getFiltersFromState,  
    setAllCheckboxes, 
    setAllChildren, 
    toggleCheckboxValue 
} from "store/utils/filterBarReducerHelpers";

const filterBarSlice = createSlice({
    name: 'filterBar',
    initialState: {
        categoryDropdown: {
            savedCategoryCheckBoxes: [],
            tempCategoryCheckBoxes: [],
            show: false,
        },
        dateDropdown: {
            savedDateRange: {startDate: undefined, endDate: undefined},
            tempDateRange: {startDate: undefined, endDate: undefined},
            show: false,
        },
        accountDropdown: {
            savedAccountCheckBoxes: [],
            tempAccountCheckBoxes: [],
            show: false,
        },
        appliedFilters : {
            startDate: undefined, 
            endDate: undefined,
            filteredCategories: [],
            filteredAccounts: []
        }
    },
    reducers: {
        // used to populate the state with checkboxes for the categories that are found in transactions
        initCategoryCheckboxes(state, action) {
            state.categoryDropdown.savedCategoryCheckBoxes = action.payload;
            state.categoryDropdown.tempCategoryCheckBoxes = action.payload;
        },
        // toggles category group checkboxes
        toggleParentCheckbox(state, action) {
            const parent = findParentCheckbox(state, action.payload);
            const newParentValue = toggleCheckboxValue(parent);
            parent.checked = newParentValue;
            parent.subCategoryObjects = setAllChildren(parent, newParentValue);
        },
        // toggles subcategory checkboxes when clicked
        toggleChildCheckbox(state, action) {

            const { categoryGroupName, subCategoryName } = action.payload;
            const parent = findParentCheckbox(state, categoryGroupName);
            
            // toggle the one child in the parent's object
            const child = findChildCheckboxByParent(parent, subCategoryName);
            child.checked = toggleCheckboxValue(child);

            // determine whether all children are checked, whether none are checked 
            const allChildrenChecked = parent.subCategoryObjects.every(e => e.checked);
            const noChildrenChecked = parent.subCategoryObjects.every(e => !e.checked);

            // check or uncheck the parent depending on the value of its children
            if (allChildrenChecked) { parent.checked = true; } 
            else if (noChildrenChecked) { parent.checked = false; }

        },
        selectAllCategories(state, action) {
            const currentBoxes = state.categoryDropdown.tempCategoryCheckBoxes;
            const newBoxes = setAllCheckboxes(currentBoxes, true);
            state.categoryDropdown.tempCategoryCheckBoxes = newBoxes;
        },
        selectNoCategories(state, action) {
            const currentBoxes = state.categoryDropdown.tempCategoryCheckBoxes;
            const newBoxes = setAllCheckboxes(currentBoxes, false);
            state.categoryDropdown.tempCategoryCheckBoxes = newBoxes;
        },
        saveCategoryCheckboxes(state, action) {
            // temp checkbox state now becomes saved checkbox state
            const newCheckboxState = state.categoryDropdown.tempCategoryCheckBoxes;
            state.categoryDropdown.savedCategoryCheckBoxes = newCheckboxState;
        },
        cancelCategoryCheckboxChanges(state, action) {
            // the temporary state reverts to the saved state
            const saved = state.categoryDropdown.savedCategoryCheckBoxes;
            state.categoryDropdown.tempCategoryCheckBoxes = saved;
        },
        setFiltersFromState(state, action) {
            // filters are gleaned from saved state
            const savedState = {
                startDate: state.dateDropdown.savedDateRange.startDate,
                endDate: state.dateDropdown.savedDateRange.endDate,
                categories: state.categoryDropdown.savedCategoryCheckBoxes,
                accounts: state.accountDropdown.savedAccountCheckBoxes,
            };
            state.appliedFilters = getFiltersFromState(savedState);
        },
        toggleCategoryDropdown(state, action) {
            state.categoryDropdown.show = !state.categoryDropdown.show;
        }
    }
});

export const {
    initCategoryCheckboxes,
    toggleParentCheckbox: toggleParentCategory,
    toggleChildCheckbox: toggleChildCategory,
    selectAllCategories,
    selectNoCategories,
    saveCategoryCheckboxes,
    cancelCategoryCheckboxChanges,
    setFiltersFromState,
    toggleCategoryDropdown
} = filterBarSlice.actions;
export const filterBarReducer = filterBarSlice.reducer;