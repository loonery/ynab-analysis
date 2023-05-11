import React from 'react';

import { useSelector } from 'react-redux';

import {
  selectCategorySpendingDataByDimension,
  selectDataKeysByCategoryDimension,
  selectTotalSpendingDataByDimension,
} from 'store/selectors/componentSelectors/spendingAnalysisSelectors';

import { assembleSpendingPlotData } from '../../utils/assemblePlotData';

import { ComposedSpendingChart } from './ComposedSpendingChart';

export const SpendingByCategoryPlotContainer = () => {
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
