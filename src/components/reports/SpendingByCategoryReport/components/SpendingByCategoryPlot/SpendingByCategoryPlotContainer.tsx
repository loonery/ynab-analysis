import React from 'react';

import { useAssembledPlotData } from '../../hooks/useAssembledPlotData';

import { ComposedSpendingChart } from './ComposedSpendingChart';

// eslint-disable-next-line
export const SpendingByCategoryPlotContainer = () => {
  const { data, dataKeys, isLoading } = useAssembledPlotData();
  if (!data || !dataKeys || isLoading) {
    return <div>Loading Plot...</div>;
  }
  return <ComposedSpendingChart data={data} dataKeys={dataKeys} />;
};
export default SpendingByCategoryPlotContainer;
