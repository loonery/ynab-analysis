import React from 'react';

import { useSelector } from 'react-redux';

import { RootState } from 'store';
import {
  selectCategorySpendingDataByDimension,
  selectDataKeysByCategoryDimension,
  selectTotalSpendingDataByDimension,
} from 'store/selectors/componentSelectors/spendingAnalysisSelectors';
import { selectTransactions } from 'store/selectors/dataSelectors/transactionSliceSelectors';

import { assembleSpendingPlotData } from '../../utils/assemblePlotData';

import { ComposedSpendingChart } from './ComposedSpendingChart';

// eslint-disable-next-line
export const SpendingByCategoryPlotContainer = () => {
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
  const { data: dataKeys } = useSelector((state: RootState) =>
    selectDataKeysByCategoryDimension(state),
  );

  // exhaustive dependency checking to make compiler happy
  const isDataLoaded =
    !isCatsLoading &&
    categorySpendingData &&
    !isTotalsLoading &&
    totalSpendingData &&
    !isTransactionsLoading;
  if (!isDataLoaded) return <div>Loading Data...</div>;

  const data = assembleSpendingPlotData(categorySpendingData, totalSpendingData);

  return (
    <ComposedSpendingChart
      className='border rounded my-2'
      data={data}
      dataKeys={dataKeys}
    />
  );
};
export default SpendingByCategoryPlotContainer;
