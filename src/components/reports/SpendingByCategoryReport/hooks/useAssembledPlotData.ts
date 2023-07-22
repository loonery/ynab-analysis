import { useSelector } from 'react-redux';

import { SpendingChartData } from 'components/interfaces/chartObjects/SpendingChartData';
import { RootState } from 'store';
import { ALL_CATEGORIES_DIMENSION } from 'store/consts/consts';
import {
  selectCategoryDimension,
  selectConstructedSpendingMap,
  selectFilteredActiveMonths,
  selectSelectedCategoryGroupId,
} from 'store/selectors/componentSelectors/spendingAnalysisSelectors';
import {
  selectAllCategoryGroupNames,
  selectSubcategoryNamesByParentId,
} from 'store/selectors/dataSelectors/categorySelectors';
import { selectTransactions } from 'store/selectors/dataSelectors/transactionSliceSelectors';

import { assembleSpendingPlotData } from '../utils/plotUtils';

/**
 *
 * @returns packaged data for the SpendingByCategory analysis chart
 */
export const useAssembledPlotData = (): {
  data: SpendingChartData[] | undefined;
  dataKeys: string[] | undefined;
  isLoading: boolean;
} => {
  // get data from our selectors
  const { isLoading: isTransactionsLoading } = useSelector((state: RootState) =>
    selectTransactions(state),
  );
  const { data: categorySpendingData, isLoading: isCatsLoading } = useSelector(
    (state: RootState) => selectConstructedSpendingMap(state),
  );
  const { data: activeMonths, isLoading: isActiveMonthsLoading } = useSelector(
    (state: RootState) => selectFilteredActiveMonths(state),
  );

  // use the state of the spending analysis
  const selectedCategoryGroupId = useSelector((state: RootState) =>
    selectSelectedCategoryGroupId(state),
  );
  const categoryDimension = useSelector((state: RootState) =>
    selectCategoryDimension(state),
  );

  // use names to determine datakeys
  const { data: categoryGroupNames } = useSelector((state: RootState) =>
    selectAllCategoryGroupNames(state),
  );
  const { data: subCategoryNames } = useSelector((state: RootState) =>
    selectSubcategoryNamesByParentId(state, selectedCategoryGroupId),
  );

  // exhaustive dependency checking to make compiler happy
  const isDataLoaded =
    !isCatsLoading &&
    categorySpendingData &&
    !isTransactionsLoading &&
    activeMonths &&
    !isActiveMonthsLoading;

  if (!isDataLoaded) return { data: undefined, dataKeys: undefined, isLoading: true };

  // The data keys define the accessors into the spending objects for each month
  const dataKeys =
    categoryDimension === ALL_CATEGORIES_DIMENSION
      ? categoryGroupNames
      : subCategoryNames;

  const data = assembleSpendingPlotData(activeMonths, categorySpendingData);
  return { data, dataKeys, isLoading: false };
};
