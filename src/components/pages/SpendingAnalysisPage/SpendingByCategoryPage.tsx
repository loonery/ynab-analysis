import React from 'react';

import { useSelector } from 'react-redux';

import CategorySelector from 'components/reports/SpendingByCategoryReport/components/CategorySelector/CategorySelector';
import SpendingByCategoryPlotContainer from 'components/reports/SpendingByCategoryReport/components/SpendingByCategoryPlot/SpendingByCategoryPlotContainer';
import { PageContainer } from 'libs/reuse/containers/PageContainer';
import { selectTransactions } from 'store/selectors/dataSelectors/transactionSliceSelectors.j's';

const SpendingAnalysisPage = () => {
  // dispatch to fetch the transactions

  // get the transactions and assess the state
  // const { loading, error } = useSelector((state) => state.transactions);

  // return when we don't have transactions
  // if (loading) return <div>loading...</div>;
  // if (error) return <div>error</div>;
  const transactions = useSelector((state) => selectTransactions(state));

  if (transactions.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>not loading</div>
    // <PageContainer>
    //   <CategorySelector />
    //   <SpendingByCategoryPlotContainer />
    // </PageContainer>
  );
};
export default SpendingAnalysisPage;
