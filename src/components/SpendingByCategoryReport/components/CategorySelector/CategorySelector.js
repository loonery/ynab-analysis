import React from 'react';

import { useSelector } from 'react-redux';

const CategorySelector = () => {
  const { filteredTransactions, loading, error } = useSelector(
    (state) => state.transactions,
  );

  if (error || loading) {
    return <div>loading or error</div>;
  }

  return filteredTransactions.map((transaction, index) => (
    <div key={index}>{...transaction}</div>
  ));
};
export default CategorySelector;
