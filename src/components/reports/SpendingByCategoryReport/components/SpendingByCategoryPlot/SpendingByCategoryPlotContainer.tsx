import React from 'react';

import { useAssembledPlotData } from '../../hooks/useAssembledPlotData';

import { ComposedSpendingChart } from './ComposedSpendingChart';

// eslint-disable-next-line
export const SpendingByCategoryPlotContainer = () => {
  const { data, dataKeys, colorMap, isLoading } = useAssembledPlotData();
  if (!data || !dataKeys || !colorMap || isLoading) {
    return <div>Loading Plot...</div>;
  }
  return <ComposedSpendingChart data={data} dataKeys={dataKeys} colorMap={colorMap} />;
};
export default SpendingByCategoryPlotContainer;
