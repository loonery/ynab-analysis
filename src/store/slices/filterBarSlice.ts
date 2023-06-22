import { createSlice } from '@reduxjs/toolkit';
import { FilterBarState } from 'store/interfaces/FilterBarState';
import {
  findChildCheckboxByParent,
  findParentCheckbox,
  getFiltersFromState,
  setAllCheckboxes,
  setAllChildren,
  toggleCheckboxValue,
} from 'store/utils/filterBarReducerHelpers';

const initialState: FilterBarState = {
  categoryDropdown: {
    savedCheckBoxes: [],
    tempCheckBoxes: [],
    show: false,
  },
  dateDropdown: {
    savedDateRange: { startDate: undefined, endDate: undefined },
    tempDateRange: { startDate: undefined, endDate: undefined },
    show: false,
  },
  accountDropdown: {
    savedCheckBoxes: [],
    tempCheckBoxes: [],
    show: false,
  },
  appliedFilters: {
    startDate: undefined,
    endDate: undefined,
    filteredCategories: [],
    filteredAccounts: [],
  },
};

const filterBarSlice = createSlice({
  name: 'filterBar',
  initialState,
  reducers: {
    // used to populate the state with checkboxes for the categories that are found in transactions
    initCheckboxes(state, action) {
      const { keys, checkboxes } = action.payload;
      const { dropdownKey, tempCheckboxKey, savedCheckboxKey } = keys;
      state[dropdownKey][savedCheckboxKey] = checkboxes;
      state[dropdownKey][tempCheckboxKey] = checkboxes;
    },
    initDateDropdown(state, action) {
      const { earliest, latest } = action.payload;
      const initalSettings = { startDate: earliest, endDate: latest };
      state.dateDropdown.savedDateRange = initalSettings;
      state.dateDropdown.tempDateRange = initalSettings;
    },
    // toggles category group checkboxes
    toggleParentCheckbox(state, action) {
      const { parentName, keys } = action.payload;
      const parent = findParentCheckbox(state, parentName, keys);
      const newParentValue = toggleCheckboxValue(parent);
      parent.checked = newParentValue;
      parent.childObjects = setAllChildren(parent, newParentValue);
    },
    // toggles subcategory checkboxes when clicked
    toggleChildCheckbox(state, action) {
      const { parentName, childName, keys } = action.payload;
      const parent = findParentCheckbox(state, parentName, keys);

      // toggle the one child in the parent's object
      const child = findChildCheckboxByParent(parent, childName);
      child.checked = toggleCheckboxValue(child);

      // determine whether all children are checked, whether none are checked
      const allChildrenChecked = parent.childObjects.every((e) => e.checked);
      const noChildrenChecked = parent.childObjects.every((e) => !e.checked);

      // check or uncheck the parent depending on the value of its children
      if (allChildrenChecked) {
        parent.checked = true;
      } else if (noChildrenChecked) {
        parent.checked = false;
      }
    },
    selectAllCheckboxes(state, action) {
      const { dropdownKey, tempCheckboxKey } = action.payload;
      const currentBoxes = state[dropdownKey][tempCheckboxKey];
      const newBoxes = setAllCheckboxes(currentBoxes, true);
      state[dropdownKey][tempCheckboxKey] = newBoxes;
    },
    selectNoCheckboxes(state, action) {
      const { dropdownKey, tempCheckboxKey } = action.payload;
      const currentBoxes = state[dropdownKey][tempCheckboxKey];
      const newBoxes = setAllCheckboxes(currentBoxes, false);
      state[dropdownKey][tempCheckboxKey] = newBoxes;
    },
    saveDropdownState(state, action) {
      const { dropdownKey, tempCheckboxKey, savedCheckboxKey } = action.payload;
      // temp checkbox state now becomes saved checkbox state
      const newState = state[dropdownKey][tempCheckboxKey];
      state[dropdownKey][savedCheckboxKey] = newState;
    },
    cancelDropdownChanges(state, action) {
      const { dropdownKey, tempCheckboxKey, savedCheckboxKey } = action.payload;
      // the temporary state reverts to the saved state
      const newState = state[dropdownKey][savedCheckboxKey];
      state[dropdownKey][tempCheckboxKey] = newState;
    },
    setFiltersFromState(state) {
      // filters are gleaned from saved state
      const savedState = {
        startDate: state.dateDropdown.savedDateRange.startDate,
        endDate: state.dateDropdown.savedDateRange.endDate,
        categories: state.categoryDropdown.savedCategoryCheckBoxes,
        accounts: state.accountDropdown.savedAccountCheckBoxes,
      };
      state.appliedFilters = getFiltersFromState(savedState);
    },
    toggleDropdown(state, action) {
      const { dropdownKey } = action.payload;
      state[dropdownKey].show = !state[dropdownKey].show;
    },
    updateStartDate(state, action) {
      const startDate = action.payload;
      const currentEndDate = state.dateDropdown.tempDateRange.endDate;

      // if the start date occurs after the currently selected endDate,
      // then move the endDate
      if (new Date(startDate) > new Date(currentEndDate)) {
        state.dateDropdown.tempDateRange.endDate = startDate;
      }
      state.dateDropdown.tempDateRange.startDate = startDate;
    },
    updateEndDate(state, action) {
      const endDate = action.payload;
      state.dateDropdown.tempDateRange.endDate = endDate;
    },
  },
});

export const {
  initCheckboxes,
  toggleParentCheckbox,
  toggleChildCheckbox,
  selectAllCheckboxes,
  selectNoCheckboxes,
  saveDropdownState,
  cancelDropdownChanges,
  initDateDropdown,
  setFiltersFromState,
  toggleDropdown,
  updateStartDate,
  updateEndDate,
} = filterBarSlice.actions;
export const filterBarReducer = filterBarSlice.reducer;
