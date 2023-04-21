import React from 'react';

import { useSelector } from 'react-redux';

import { Row } from 'react-bootstrap';

const SpendingByCategoryReport = () => {
  // dispatch to fetch the transactions

  // get the transactions and assess the state
  const { loading, error } = useSelector((state) => state.transactions);
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
