import { useSelector } from 'react-redux';

import { SpendingChartData } from 'components/interfaces/chartObjects/SpendingChartData';
import { RootState } from 'store';
import {
  selectCategorySpendingDataByDimension,
  selectDataKeysByCategoryDimension,
  selectTotalSpendingDataByDimension,
} from 'store/selectors/componentSelectors/spendingAnalysisSelectors';
import { selectTransactions } from 'store/selectors/dataSelectors/transactionSliceSelectors';

import { DataKeys } from '../components/SpendingByCategoryPlot/interfaces/types/types';
import { assembleSpendingPlotData } from '../utils/plotUtils';

/**
 *
 * @returns packaged data for the SpendingByCategory analysis chart
 */
export const useAssembledPlotData = (): {
  data: SpendingChartData[] | undefined;
  dataKeys: DataKeys | undefined;
  isLoading: boolean;
} => {
  // Parse the fetched data from our selectors
  const { isLoading: isTransactionsLoading } = useSelector((state: RootState) =>
    selectTransactions(state),
  );
  const { data: categorySpendingData, isLoading: isCatsLoading } = useSelector(
    (state: RootState) => selectCategorySpendingDataByDimension(state),
  );
  const { data: totalSpendingData, isLoading: isTotalsLoading } = useSelector(
    (state: RootState) => selectTotalSpendingDataByDimension(state),
  );
  const { data: dataKeys, isLoading: dataKeysLoading } = useSelector((state: RootState) =>
    selectDataKeysByCategoryDimension(state),
  );
  // exhaustive dependency checking to make compiler happy
  const isDataLoaded =
    !isCatsLoading &&
    categorySpendingData &&
    !isTotalsLoading &&
    totalSpendingData &&
    !isTransactionsLoading &&
    !dataKeysLoading &&
    dataKeys;

  if (!isDataLoaded) return { data: undefined, dataKeys: undefined, isLoading: true };

  const data = assembleSpendingPlotData(categorySpendingData, totalSpendingData);
  return { data, dataKeys, isLoading: false };
};
