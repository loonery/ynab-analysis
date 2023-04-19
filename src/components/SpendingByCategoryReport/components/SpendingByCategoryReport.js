import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Row } from 'react-bootstrap';

import { fetchTransactionsThunk } from '../../../api/thunks/fetchTransactionsThunk';
import { selectFilteredTransactions } from '../../../store/selectors/transactionSliceSelectors';

const SpendingByCategoryReport = () => {
  // dispatch to fetch the transactions
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTransactionsThunk());
  }, [dispatch]);

  // get the transactions and assess the state
  const { loading, error } = useSelector((state) => state.transactions);
  const filteredTransactions = useSelector((state) => selectFilteredTransactions(state));
  console.log(filteredTransactions);
  // return when we don't have transactions
  if (loading) return <div>loading...</div>;
  if (error) return <div>error</div>;

  return (
    // the whole dashboard renders as a row within the container
    <Row>
      <div className='col'>
        Here is where we render the plot
        {/* House the category dropdown options */}
        {/* <CategorySelector /> */}
        {/* house the spending analysis plot */}
        {/* <SpendingAnalysisPlot   */}
        {/* categoryDimension={categoryDimension} */}
        {/* selectedCategoryItem={selectedCategoryItem}/> */}
      </div>
    </Row>
  );
};
export default SpendingByCategoryReport;
