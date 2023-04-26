import React from 'react';
import { Fragment } from 'react';

import { useSelector } from 'react-redux';

import { FlexContainer } from 'libs/reuse/containers/FlexContainer';
import { Row } from 'react-bootstrap';

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
      <Row>
        <FlexContainer gap={'10px'}>
          <SpendingAnalysisPlot loading={loading} />
        </FlexContainer>
      </Row>
    </Fragment>
  );
};
export default SpendingByCategoryReport;
