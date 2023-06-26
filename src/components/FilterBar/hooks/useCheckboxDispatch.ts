import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Account } from 'interfaces/Account';
import { CategoryData, CategoryGroup } from 'interfaces/Category';
import { NestedCheckBoxSection } from 'libs/reuse/components/NestedCheckBoxList/interfaces/NestedCheckboxSection';
import { RootState } from 'store';
import {
  ACCOUNT_DROPDOWN_REDUCER_KEY,
  CATEGORY_DROPDOWN_REDUCER_KEY,
} from 'store/consts/consts';
import {
  CheckBoxDropdownKey,
  CheckboxDropdownState,
} from 'store/interfaces/FilterBarState';
import { selectDropdown } from 'store/selectors/componentSelectors/filterBarSelectors';
import { selectAccountData } from 'store/selectors/dataSelectors/accountSelectors';
import { selectCategoryData } from 'store/selectors/dataSelectors/categorySelectors';
import { initCheckboxes } from 'store/slices/filterBarSlice';
import { toggleParentCheckbox, toggleChildCheckbox } from 'store/slices/filterBarSlice';

import {
  assembleAccountCheckboxes,
  assembleCategoryCheckboxObjects,
} from '../utils/filterBarUtils';

export const useCheckboxState = (
  dropdownKey: CheckBoxDropdownKey,
): {
  tempCheckboxes: NestedCheckBoxSection[];
  parentOnClick: (parentId: string) => void;
  childOnClick: (parentId: string, childId: string) => void;
} => {
  const dispatch = useDispatch();

  // retrieve data for the checkboxes
  const { data: categoryData, isLoading: isCategoryDataLoading } = useSelector(
    (state: RootState) => selectCategoryData(state),
  );
  const { data: accountData, isLoading: isAccountDataLoading } = useSelector(
    (state: RootState) => selectAccountData(state),
  );

  // process checkbox objects determined by the type of data they will be created from
  let data: Account[] | CategoryData | undefined = undefined;
  let isLoading = true;

  switch (dropdownKey) {
    case CATEGORY_DROPDOWN_REDUCER_KEY: {
      data = categoryData as CategoryData;
      isLoading = isCategoryDataLoading;
      break;
    }
    case ACCOUNT_DROPDOWN_REDUCER_KEY: {
      data = accountData as Account[];
      isLoading = isAccountDataLoading;
      break;
    }
  }

  // assemble and initialize the checkboxes on start
  React.useEffect(() => {
    if (data && !isLoading) {
      switch (dropdownKey) {
        case CATEGORY_DROPDOWN_REDUCER_KEY: {
          const { categories }: { categories: CategoryGroup[] } = data as CategoryData;
          const checkboxes = assembleCategoryCheckboxObjects(categories);
          dispatch(initCheckboxes({ checkboxes, dropdownKey }));
          break;
        }
        case ACCOUNT_DROPDOWN_REDUCER_KEY: {
          const checkboxes = assembleAccountCheckboxes(data as Account[]);
          dispatch(initCheckboxes({ checkboxes, dropdownKey }));
          break;
        }
      }
    }
  }, [data, isLoading]);

  const parentOnClick = (parentId: string): void => {
    dispatch(
      toggleParentCheckbox({
        parentId,
        dropdownKey,
      }),
    );
  };

  const childOnClick = (parentId: string, childId: string): void => {
    dispatch(
      toggleChildCheckbox({
        parentId,
        childId,
        dropdownKey,
      }),
    );
  };

  // the checkboxes we render are the ones that the user is manipulating,
  // the 'temp' checkboxes. Temp is a copy of saved checkboxes on open.
  const { tempCheckboxes } = useSelector(
    (state: RootState): CheckboxDropdownState =>
      selectDropdown(state, dropdownKey) as CheckboxDropdownState,
  );

  return { tempCheckboxes, parentOnClick, childOnClick };
};
