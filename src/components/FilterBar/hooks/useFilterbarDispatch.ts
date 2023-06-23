import { useDispatch } from 'react-redux';

import { toggleParentCheckbox, toggleChildCheckbox } from 'store/slices/filterBarSlice';

export const useFilterBarDispatch = () => {
  const dispatch = useDispatch();
  const parentOnClick = (parentName) =>
    dispatch(
      toggleParentCheckbox({
        parentName,
        keys,
      }),
    );

  const childOnClick = (parentName, childName): void =>
    dispatch(
      toggleChildCheckbox({
        parentName,
        childName,
        keys,
      }),
    );

  const initializeCheckboxes = () => {};

  return { parentOnClick, childOnClick };
};
