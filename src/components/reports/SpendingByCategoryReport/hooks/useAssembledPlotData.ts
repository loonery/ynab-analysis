import { useSelector } from 'react-redux';

import { SpendingChartData } from 'components/interfaces/chartObjects/SpendingChartData';
import { RootState } from 'store';
import { ALL_CATEGORIES_DIMENSION } from 'store/consts/consts';
import {
  selectCategoryDimension,
  selectSelectedCategoryGroupId,
  selectSpendingCharyDataByCategoryDimension,
} from 'store/selectors/componentSelectors/spendingAnalysisSelectors';
import {
  selectAllCategoryGroupNames,
  selectSubcategoryNamesByParentId,
} from 'store/selectors/dataSelectors/categorySelectors';

/**
 *
 * @returns packaged data for the SpendingByCategory analysis chart
 */
export const useAssembledPlotData = (): {
  data: SpendingChartData[] | undefined;
  dataKeys: string[] | undefined;
  isLoading: boolean;
} => {
  // use the state of the spending analysis
  const selectedCategoryGroupId = useSelector((state: RootState) =>
    selectSelectedCategoryGroupId(state),
  );
  const categoryDimension = useSelector((state: RootState) =>
    selectCategoryDimension(state),
  );
  const { data: spendingChartData } = useSelector((state: RootState) =>
    selectSpendingCharyDataByCategoryDimension(state),
  );

  // use names to determine datakeys
  const { data: categoryGroupNames } = useSelector((state: RootState) =>
    selectAllCategoryGroupNames(state),
  );
  const { data: subCategoryNames } = useSelector((state: RootState) =>
    selectSubcategoryNamesByParentId(state, selectedCategoryGroupId),
  );

  // if we don't have the data, return early
  if (!spendingChartData)
    return { data: undefined, dataKeys: undefined, isLoading: true };

  // The data keys define the accessors into the spending objects for each month
  const dataKeys =
    categoryDimension === ALL_CATEGORIES_DIMENSION
      ? categoryGroupNames
      : subCategoryNames;

  return { data: spendingChartData, dataKeys, isLoading: false };
};
