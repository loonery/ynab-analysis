import { useSelector } from 'react-redux';

import { OptionInterface } from 'libs/reuse/elements/form-controls/interfaces/interfaces';
import { RootState } from 'store';
import {
  selectCategoryOptions,
  selectCategoryGroupOptions,
  selectSelectedCategoryGroupId,
  selectSelectedCategoryId,
} from 'store/selectors/componentSelectors/spendingAnalysisSelectors';

export const useCategoryData = (): {
  categoryGroupOptions: OptionInterface<string>[];
  categoryDrilldownOptions: OptionInterface<string>[];
  selectedCategoryGroupId: string;
  selectedSubCategoryId: string;
  isLoading: boolean;
} => {
  const { data: categoryGroupOptions, isLoading: categoryGroupOptionsLoading } =
    useSelector((state: RootState) => selectCategoryGroupOptions(state));

  const { data: categoryDrilldownOptions, isLoading: categoryDrilldownOptionsLoading } =
    useSelector((state: RootState) => selectCategoryOptions(state));

  const selectedCategoryGroupId = useSelector((state: RootState) =>
    selectSelectedCategoryGroupId(state),
  );
  const selectedSubCategoryId = useSelector((state: RootState) =>
    selectSelectedCategoryId(state),
  );

  const dataLoading =
    categoryGroupOptionsLoading ||
    categoryDrilldownOptionsLoading ||
    !categoryGroupOptions ||
    !categoryDrilldownOptions;

  return dataLoading
    ? {
        categoryGroupOptions: [],
        categoryDrilldownOptions: [],
        selectedCategoryGroupId,
        selectedSubCategoryId,
        isLoading: true,
      }
    : {
        categoryGroupOptions,
        categoryDrilldownOptions,
        selectedCategoryGroupId,
        selectedSubCategoryId,
        isLoading: false,
      };
};
