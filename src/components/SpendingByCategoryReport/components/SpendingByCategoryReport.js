import React from 'react';
import { Fragment } from 'react';

import { useSelector } from 'react-redux';

import CategorySelector from './CategorySelector';
import SpendingAnalysisPlot from './SpendingByCategoryPlot/SpendingAnalysisPlot';

const SpendingByCategoryReport = () => {
  // dispatch to fetch the transactions

  // get the transactions and assess the state
  const { loading, error } = useSelector((state) => state.transactions);

  // return when we don't have transactions
  if (loading) return <div>loading...</div>;
  if (error) return <div>error</div>;

  return (
    <Fragment>
      <CategorySelector />
      <SpendingAnalysisPlot />
    </Fragment>
  );
};
export default SpendingByCategoryReport;
