import React from 'react';

import { useSelector } from 'react-redux';

import {
  fetchCategoryTotalsSelector,
  fetchTotalsSelector,
} from 'components/SpendingByCategoryReport/utils/fetchSelectorUtils';
import Plot from 'react-plotly.js';
import { selectCategoryDimension } from 'store/selectors/spendingAnalysisSelectors';

import { getTraces } from './getTraces';

const SpendingAnalysisPlot = () => {
  const { loading } = useSelector((state) => state.transactions);
  const categoryDimension = useSelector((state) => selectCategoryDimension(state));

  const categorySpendingSelector = fetchCategoryTotalsSelector(categoryDimension);
  const categorySpendingData = useSelector((state) => categorySpendingSelector(state));

  const totalSpendingSelector = fetchTotalsSelector(categoryDimension);
  const totalSpendingData = useSelector((state) => totalSpendingSelector(state));

  if (loading || totalSpendingData === undefined || categorySpendingData === undefined)
    return <div>loading...</div>;

  const traceObjects = getTraces(categorySpendingData, totalSpendingData);

  /* Get the Layout for the Plot */
  const getLayout = () => {
    const yaxis = { tickprefix: '$' };
    const xaxis = { tickprefix: '' };

    return {
      barmode: 'stack',
      showlegend: false,
      width: 800,
      height: 800,
      yaxis: yaxis,
      xaxis: xaxis,
    };
  };

  /* Get the Configuration for the Plot */
  const getConfig = () => {
    return {
      responsive: true,
      displayModeBar: false,
    };
  };

  return (
    <Plot
      className='border rounded my-2'
      data={traceObjects}
      layout={getLayout()}
      config={getConfig()}
    />
  );
};
export default SpendingAnalysisPlot;
