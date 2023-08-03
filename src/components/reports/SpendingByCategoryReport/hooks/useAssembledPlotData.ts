import { useSelector } from 'react-redux';

import { SpendingChartData } from 'components/interfaces/chartObjects/SpendingChartData';
import { RootState } from 'store';
import { ALL_CATEGORIES_DIMENSION } from 'store/consts/consts';
import { ColorMap } from 'store/interfaces/SpendingAnalysis';
import {
  selectCategoryDimension,
  selectSelectedCategoryGroupId,
  selectSpendingCharyDataByCategoryDimension,
} from 'store/selectors/componentSelectors/spendingAnalysisSelectors';
import {
  selectAllCategoryGroupIds,
  selectCategoryColors,
  selectSubcategoryIdsByParentId,
} from 'store/selectors/dataSelectors/categorySelectors';

/**
 *
 * @returns array of objects for the recharts SpendingByCategory analysis chart
 */
export const useAssembledPlotData = (): {
  data: SpendingChartData[] | undefined;
  dataKeys: string[] | undefined;
  colorMap: ColorMap | undefined;
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
  const { data: categoryGroupIds } = useSelector((state: RootState) =>
    selectAllCategoryGroupIds(state),
  );
  const { data: subCategoryIds } = useSelector((state: RootState) =>
    selectSubcategoryIdsByParentId(state, selectedCategoryGroupId),
  );

  // get colors for categories
  const { data: colorMap } = useSelector((state: RootState) =>
    selectCategoryColors(state, 'random'),
  );

  // if we don't have the data, return early
  if (!spendingChartData)
    return { data: undefined, dataKeys: undefined, colorMap: undefined, isLoading: true };

  // The data keys define the accessors into the spending objects for each month
  const dataKeys =
    categoryDimension === ALL_CATEGORIES_DIMENSION ? categoryGroupIds : subCategoryIds;

  return { data: spendingChartData, dataKeys, colorMap, isLoading: false };
};
