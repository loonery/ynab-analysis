import { useDispatch } from 'react-redux';

import { CheckBoxDropdownKey } from 'store/interfaces/FilterBarState';
import { toggleParentCheckbox, toggleChildCheckbox } from 'store/slices/filterBarSlice';

export const useFilterBarDispatch = (dropdownKey: CheckBoxDropdownKey): void => {
  const dispatch = useDispatch();
  const parentOnClick = (parentId: string) =>
    dispatch(
      toggleParentCheckbox({
        parentId,
        dropdownKey,
      }),
    );

  const childOnClick = (parentId: string, childId: string): void => {
    dispatch(
      toggleChildCheckbox({
        parentId,
        childId,
        dropdownKey,
      }),
    );
  };

  const initializeCheckboxes = () => {};

  return { parentOnClick, childOnClick };
};
