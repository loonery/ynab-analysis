import React from 'react';

import { useSelector } from 'react-redux';

import { PageContainer } from 'libs/reuse/containers/PageContainer';

import CategorySelector from './CategorySelector';
import { SpendingByCategoryPlotContainer } from './SpendingByCategoryPlot/SpendingByCategoryPlotContainer';

const SpendingByCategoryPage = () => {
  // dispatch to fetch the transactions

  // get the transactions and assess the state
  const { loading, error } = useSelector((state) => state.transactions);

  // return when we don't have transactions
  if (loading) return <div>loading...</div>;
  if (error) return <div>error</div>;

  return (
    <PageContainer>
      <CategorySelector />
      <SpendingByCategoryPlotContainer />
    </PageContainer>
  );
};
export default SpendingByCategoryPage;
