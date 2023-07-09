import { createSlice } from '@reduxjs/toolkit';
import {
  NestedCheckBoxSection,
  ChildCheckboxObject,
} from 'components/FilterBar/components/NestedCheckboxDropdownContainer/NestedCheckBoxList/interfaces/NestedCheckboxSection';
import {
  DROPDOWN_SHOW_KEY,
  INITIAL_CHECKBOX_DROPDOWN_STATE,
  INITIAL_DATE_DROPDOWN_STATE,
  DATE_DROPDOWN_REDUCER_KEY,
  ACCOUNT_DROPDOWN_REDUCER_KEY,
  SAVED_CHECKBOX_KEY,
  TEMP_CHECKBOX_KEY,
  CATEGORY_DROPDOWN_REDUCER_KEY,
  TEMP_DATE_RANGE_KEY,
  SAVED_DATE_RANGE_KEY,
} from 'store/consts/consts';
import {
  CheckBoxDropdownKey,
  CheckboxDropdownState,
  SavedStateDropdownKey,
  TempStateDropdownKey,
  FilterBarDropdownState,
  FilterBarState,
  DropdownKey,
} from 'store/interfaces/FilterBarState';
import { MonthYear } from 'store/interfaces/types/MonthYear';
import {
  findChildCheckboxByChildId,
  findParentCheckbox,
  getFiltersFromState,
  setAllChildrenToValue,
  toggleCheckboxValue,
  setAllCheckboxesHelper,
} from 'store/utils/filterBarReducerHelpers';

import { DateRange } from '../interfaces/DateRange';

const initialState: FilterBarState = {
  [CATEGORY_DROPDOWN_REDUCER_KEY]: { ...INITIAL_CHECKBOX_DROPDOWN_STATE },
  [ACCOUNT_DROPDOWN_REDUCER_KEY]: { ...INITIAL_CHECKBOX_DROPDOWN_STATE },
  [DATE_DROPDOWN_REDUCER_KEY]: { ...INITIAL_DATE_DROPDOWN_STATE },
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
    ///////////////////////////////////////////////////////////////////////////////////////////////
    initCheckboxes(state, action) {
      const {
        dropdownKey,
        checkboxes,
      }: { dropdownKey: CheckBoxDropdownKey; checkboxes: NestedCheckBoxSection[] } =
        action.payload;

      const checkboxState: CheckboxDropdownState = state[dropdownKey];
      checkboxState[SAVED_CHECKBOX_KEY] = checkboxes;
      checkboxState[TEMP_CHECKBOX_KEY] = checkboxes;
    },
    ///////////////////////////////////////////////////////////////////////////////////////////////
    toggleParentCheckbox(state, action) {
      const {
        parentId,
        dropdownKey,
      }: { parentId: string; dropdownKey: CheckBoxDropdownKey } = action.payload;
      // get current state
      const checkboxState: CheckboxDropdownState = state[dropdownKey];
      const parent = findParentCheckbox(checkboxState, parentId);
      // reassign state
      parent.checked = toggleCheckboxValue(parent);
      parent.childObjects = setAllChildrenToValue(parent.childObjects, parent.checked);
    },
    ///////////////////////////////////////////////////////////////////////////////////////////////
    toggleChildCheckbox(state, action) {
      const {
        childId,
        parentId,
        dropdownKey,
      }: { childId: string; parentId: string; dropdownKey: CheckBoxDropdownKey } =
        action.payload;
      const checkboxState: CheckboxDropdownState = state[dropdownKey];
      const parent = findParentCheckbox(checkboxState, parentId);

      // toggle the one child in the parent's object
      const child: ChildCheckboxObject = findChildCheckboxByChildId(parent, childId);
      child.checked = toggleCheckboxValue(child);

      // determine whether all children are checked, whether none are checked
      const allChildrenChecked = parent.childObjects.every((e) => e.checked);
      const noChildrenChecked = parent.childObjects.every((e) => !e.checked);

      // check or uncheck the parent depending on the value of its children
      if (allChildrenChecked) parent.checked = true;
      else if (noChildrenChecked) parent.checked = false;
    },
    ///////////////////////////////////////////////////////////////////////////////////////////////
    setAllCheckboxes(state, { payload }) {
      const { dropdownKey, value }: { dropdownKey: CheckBoxDropdownKey; value: boolean } =
        payload;
      const checkboxState: CheckboxDropdownState = state[dropdownKey];
      const currentBoxes = checkboxState[TEMP_CHECKBOX_KEY];
      checkboxState[TEMP_CHECKBOX_KEY] = setAllCheckboxesHelper(currentBoxes, value);
    },
    ///////////////////////////////////////////////////////////////////////////////////////////////
    saveDropdownState(state, { payload }) {
      const {
        dropdownKey,
        tempKey,
        savedKey,
      }: {
        dropdownKey: DropdownKey;
        tempKey: TempStateDropdownKey;
        savedKey: SavedStateDropdownKey;
      } = payload;
      // temp checkbox state now becomes saved checkbox state
      const currentTempState: FilterBarDropdownState = state[dropdownKey][tempKey];
      state[dropdownKey][savedKey] = currentTempState;
    },
    ///////////////////////////////////////////////////////////////////////////////////////////////
    cancelDropdownChanges(state, action) {
      const {
        dropdownKey,
        tempKey,
        savedKey,
      }: {
        dropdownKey: DropdownKey;
        tempKey: TempStateDropdownKey;
        savedKey: SavedStateDropdownKey;
      } = action.payload;
      // the temporary state reverts to the saved state
      const latestSavedState = state[dropdownKey][savedKey];
      state[dropdownKey][tempKey] = latestSavedState;
    },
    ///////////////////////////////////////////////////////////////////////////////////////////////
    setFiltersFromState(state) {
      // filters are gleaned from saved state
      const savedState = {
        startDate: state[DATE_DROPDOWN_REDUCER_KEY][SAVED_DATE_RANGE_KEY].startDate,
        endDate: state[DATE_DROPDOWN_REDUCER_KEY][SAVED_DATE_RANGE_KEY].endDate,
        categories: state[CATEGORY_DROPDOWN_REDUCER_KEY][SAVED_CHECKBOX_KEY],
        accounts: state[ACCOUNT_DROPDOWN_REDUCER_KEY][SAVED_CHECKBOX_KEY],
      };
      state.appliedFilters = getFiltersFromState(savedState);
    },
    ///////////////////////////////////////////////////////////////////////////////////////////////
    toggleShowDropdown(state, { payload }) {
      const { dropdownKey }: { dropdownKey: DropdownKey } = payload;
      state[dropdownKey][DROPDOWN_SHOW_KEY] = !state[dropdownKey][DROPDOWN_SHOW_KEY];
    },
    ///////////////////////////////////////////////////////////////////////////////////////////////
    /*
     *  Date filter Dropdown reducers
     */
    ///////////////////////////////////////////////////////////////////////////////////////////////
    initDateDropdown(state, action) {
      const { startDate, endDate }: DateRange = action.payload;
      const initalRange: DateRange = { startDate, endDate };
      state[DATE_DROPDOWN_REDUCER_KEY][SAVED_DATE_RANGE_KEY] = initalRange;
      state[DATE_DROPDOWN_REDUCER_KEY][TEMP_DATE_RANGE_KEY] = initalRange;
    },
    ///////////////////////////////////////////////////////////////////////////////////////////////
    updateStartDate(state, { payload }) {
      const { startDate }: DateRange = payload;
      const currentEndDate =
        state[DATE_DROPDOWN_REDUCER_KEY][TEMP_DATE_RANGE_KEY].endDate;

      // if the start date occurs after the currently selected endDate,
      // then move the endDate
      if (!startDate || !currentEndDate) {
        throw new Error('Dates not defined for some reason');
      }
      if (new Date(startDate) > new Date(currentEndDate)) {
        state[DATE_DROPDOWN_REDUCER_KEY][TEMP_DATE_RANGE_KEY].endDate = startDate;
      }
      state[DATE_DROPDOWN_REDUCER_KEY][TEMP_DATE_RANGE_KEY].startDate = startDate;
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////
    updateEndDate(state, { payload }) {
      const endDate: MonthYear = payload;
      state[DATE_DROPDOWN_REDUCER_KEY][TEMP_DATE_RANGE_KEY].endDate = endDate;
    },
  },
});

export const {
  initCheckboxes,
  toggleParentCheckbox,
  toggleChildCheckbox,
  setAllCheckboxes,
  initDateDropdown,
  updateStartDate,
  updateEndDate,
  toggleShowDropdown,
  saveDropdownState,
  cancelDropdownChanges,
  setFiltersFromState,
} = filterBarSlice.actions;
export const filterBarReducer = filterBarSlice.reducer;
