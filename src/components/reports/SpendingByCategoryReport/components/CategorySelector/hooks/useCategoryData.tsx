import { useSelector } from 'react-redux';

import { faL } from '@fortawesome/free-solid-svg-icons';

import { CategoryGroup, SubCategory } from 'interfaces/Category';
import { RootState } from 'store';
import { FetchedData } from 'store/interfaces/FetchedData';
import {
  selectCategorySelectorCategoryOptions,
  selectCategorySelectorGroupOptions,
  selectSelectedCategoryGroup,
  selectSelectedCategory,
} from 'store/selectors/componentSelectors/spendingAnalysisSelectors';

export const useCategoryData = (): {
  categoryGroupOptions: string[];
  categoryDrilldownOptions: string[];
  selectedCategoryGroup: CategoryGroup | string;
  selectedCategory: SubCategory | string;
  isLoading: boolean;
} => {
  const { data: categoryGroupOptions, isLoading: categoryGroupOptionsLoading } =
    useSelector((state: RootState) => selectCategorySelectorGroupOptions(state));

  const { data: categoryDrilldownOptions, isLoading: categoryDrilldownOptionsLoading } =
    useSelector((state: RootState) => selectCategorySelectorCategoryOptions(state));

  const selectedCategoryGroup = useSelector((state: RootState) =>
    selectSelectedCategoryGroup(state),
  );
  const selectedCategory = useSelector((state: RootState) =>
    selectSelectedCategory(state),
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
        selectedCategoryGroup,
        selectedCategory,
        isLoading: true,
      }
    : {
        categoryGroupOptions,
        categoryDrilldownOptions,
        selectedCategoryGroup,
        selectedCategory,
        isLoading: false,
      };
};
