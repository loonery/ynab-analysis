import { useSelector } from 'react-redux';

import { SpendingChartData } from 'components/interfaces/chartObjects/SpendingChartData';
import { RootState } from 'store';
import { FetchedData } from 'store/interfaces/FetchedData';
import { MonthYear } from 'store/interfaces/types/MonthYear';
import {
  selectCategorySpendingDataByDimension,
  selectDataKeysByCategoryDimension,
  selectTotalSpendingDataByDimension,
} from 'store/selectors/componentSelectors/spendingAnalysisSelectors';
import {
  selectFilteredTransactionDates,
  selectTransactions,
} from 'store/selectors/dataSelectors/transactionSliceSelectors';

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
  const { data: dataKeys, isLoading: dataKeysLoading } = useSelector(
    (state: RootState) =>
      selectDataKeysByCategoryDimension(state) as FetchedData<MonthYear[]>,
  );
  const { data: activeMonths, isLoading: isActiveMonthsLoading } = useSelector(
    (state: RootState) => selectFilteredTransactionDates(state),
  );
  // exhaustive dependency checking to make compiler happy
  const isDataLoaded =
    !isCatsLoading &&
    categorySpendingData &&
    !isTotalsLoading &&
    totalSpendingData &&
    !isTransactionsLoading &&
    !dataKeysLoading &&
    dataKeys &&
    activeMonths &&
    !isActiveMonthsLoading;

  if (!isDataLoaded) return { data: undefined, dataKeys: undefined, isLoading: true };

  const data = assembleSpendingPlotData(
    activeMonths,
    dataKeys,
    categorySpendingData,
    totalSpendingData,
  );
  return { data, dataKeys, isLoading: false };
};
