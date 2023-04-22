import React from 'react';
import { Fragment } from 'react';

import { useSelector } from 'react-redux';

import { FlexContainer } from 'libs/reuse/containers/FlexContainer';
import { Row } from 'react-bootstrap';
import { selectFilteredTransactions } from 'store/selectors/transactionSliceSelectors';

import CategorySelector from './CategorySelector';

const SpendingByCategoryReport = () => {
  // dispatch to fetch the transactions

  // get the transactions and assess the state
  const { loading, error } = useSelector((state) => state.transactions);

  const filteredTransactions = useSelector((state) => selectFilteredTransactions(state));

  // return when we don't have transactions
  if (loading) return <div>loading...</div>;
  if (error) return <div>error</div>;

  return (
    <Fragment>
      <CategorySelector />
      <Row>
        <div className='col'>
          {filteredTransactions.map((transaction, index) => (
            <FlexContainer key={index} gap={'10px'}>
              <span>{index}</span>
              <span>{transaction.date}</span>
              <span>{transaction.month_year}</span>
              <span>
                {transaction.category_name ? transaction.category_name : 'undefined'}
              </span>
              <span>{transaction.payee_name}</span>
              <span>{transaction.memo}</span>
            </FlexContainer>
          ))}
        </div>
      </Row>
    </Fragment>
  );
};
export default SpendingByCategoryReport;
