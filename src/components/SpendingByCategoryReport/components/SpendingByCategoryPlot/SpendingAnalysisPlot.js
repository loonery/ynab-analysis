import React from 'react';

import { useSelector } from 'react-redux';

import {
  selectCategorySpendingDataByDimension,
  selectDataKeysByCategoryDimension,
  selectTotalSpendingDataByDimension,
} from 'store/selectors/spendingAnalysisSelectors';

import { ComposedSpendingChart } from './ComposedSpendingChart';
import { getSpendingPlotData } from './getSpendingPlotData';

const SpendingAnalysisPlot = () => {
  const { loading } = useSelector((state) => state.transactions);

  const categorySpendingData = useSelector((state) =>
    selectCategorySpendingDataByDimension(state),
  );
  const totalSpendingData = useSelector((state) =>
    selectTotalSpendingDataByDimension(state),
  );
  const dataKeys = useSelector((state) => selectDataKeysByCategoryDimension(state));

  if (loading || totalSpendingData === undefined || categorySpendingData === undefined)
    return <div>loading...</div>;

  const data = getSpendingPlotData(categorySpendingData, totalSpendingData, dataKeys);

  return <ComposedSpendingChart className='border rounded my-2' data={data} />;
};
export default SpendingAnalysisPlot;
