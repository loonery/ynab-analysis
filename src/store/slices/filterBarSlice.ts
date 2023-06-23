import { createSlice } from '@reduxjs/toolkit';
import { Draft } from '@reduxjs/toolkit';
import { NestedCheckBoxSection } from 'libs/reuse/components/NestedCheckBoxList/interfaces/NestedCheckboxSection';
import { CheckboxDropdownState, FilterBarState } from 'store/interfaces/FilterBarState';
import {
  findChildCheckboxByParent,
  findParentCheckbox,
  getFiltersFromState,
  setAllCheckboxes,
  setAllChildren,
  toggleCheckboxValue,
  getCurrentCheckboxState,
} from 'store/utils/filterBarReducerHelpers';

import { DateRange } from '../interfaces/DateRange';
import { DropdownKey } from '../interfaces/FilterBarState';

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
      const {
        dropdownKey,
        checkboxes,
      }: { dropdownKey: DropdownKey; checkboxes: NestedCheckBoxSection[] } =
        action.payload;

      // revisit this - potentially breaks the immer library functionality!!!!
      const checkboxState = state[dropdownKey] as Draft<CheckboxDropdownState>;
      checkboxState.savedCheckBoxes = checkboxes;
      checkboxState.tempCheckBoxes = checkboxes;
    },
    toggleParentCheckbox(state, action) {
      const { parentId, dropdownKey }: { parentId: string; dropdownKey: DropdownKey } =
        action.payload;
      // get current state
      const checkboxState = getCurrentCheckboxState(state, dropdownKey);
      const parent = findParentCheckbox(checkboxState, parentId);
      // reassign state
      parent.checked = toggleCheckboxValue(parent);
      parent.childObjects = setAllChildren(parent.childObjects, parent.checked);
    },
    toggleChildCheckbox(state, action) {
      const { childId, parentId, keys } = action.payload;
      const parent = findParentCheckbox(state, parentId);

      // toggle the one child in the parent's object
      const child = findChildCheckboxByParent(parent, childId);
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
    setAllCheckboxes(state, { payload }) {
      const { dropdownKey, value }: { dropdownKey: DropdownKey; value: boolean } =
        payload;
      const checkboxState = state[dropdownKey] as Draft<CheckboxDropdownState>;
      const currentBoxes = checkboxState.tempCheckBoxes;
      const newBoxes = setAllCheckboxes(currentBoxes, value);
      checkboxState.tempCheckBoxes = newBoxes;
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
        categories: state.categoryDropdown.savedCheckBoxes,
        accounts: state.accountDropdown.savedCheckBoxes,
      };
      state.appliedFilters = getFiltersFromState(savedState);
    },
    toggleShowDropdown(state, { payload }) {
      const { dropdownKey }: { dropdownKey: DropdownKey } = payload;
      state[dropdownKey].show = !state[dropdownKey].show;
    },
    /*
     *  Date filter Dropdown reducers
     */
    initDateDropdown(state, action) {
      const { startDate, endDate }: DateRange = action.payload;
      const initalRange: DateRange = { startDate, endDate };
      state.dateDropdown.savedDateRange = initalRange;
      state.dateDropdown.tempDateRange = initalRange;
    },
    updateStartDate(state, { payload }) {
      const { startDate }: DateRange = payload;
      const currentEndDate = state.dateDropdown.tempDateRange.endDate;

      // if the start date occurs after the currently selected endDate,
      // then move the endDate
      if (new Date(startDate ?? '') > new Date(currentEndDate ?? '')) {
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
  setAllCheckboxes: selectAllCheckboxes,
  selectNoCheckboxes,
  saveDropdownState,
  cancelDropdownChanges,
  initDateDropdown,
  setFiltersFromState,
  toggleShowDropdown: toggleDropdown,
  updateStartDate,
  updateEndDate,
} = filterBarSlice.actions;
export const filterBarReducer = filterBarSlice.reducer;
