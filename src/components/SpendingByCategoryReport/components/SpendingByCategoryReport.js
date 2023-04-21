import React from 'react';

import { useSelector } from 'react-redux';

import { Row } from 'react-bootstrap';
import { selectFilteredTransactions } from 'store/selectors/transactionSliceSelectors';

const SpendingByCategoryReport = () => {
  // dispatch to fetch the transactions

  // get the transactions and assess the state
  const { loading, error } = useSelector((state) => state.transactions);

  const filteredTransactions = useSelector((state) => selectFilteredTransactions(state));

  // return when we don't have transactions
  if (loading) return <div>loading...</div>;
  if (error) return <div>error</div>;

  return (
    // the whole dashboard renders as a row within the container
    <Row>
      <div className='col'>
        {filteredTransactions.map((transaction, index) => (
          <div key={index}>{transaction.category_name}</div>
        ))}
      </div>
    </Row>
  );
};
export default SpendingByCategoryReport;
