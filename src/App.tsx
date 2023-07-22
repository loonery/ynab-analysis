import React from 'react';

import { useSelector } from 'react-redux';

import {
  useGetAccountsQuery,
  useGetAllBudgetMonthsQuery,
  useGetTransactionsQuery,
} from 'api/ynabApi';
import { useGetCategoriesQuery } from 'api/ynabApi';
import { AppContainer } from 'libs/reuse/containers/AppContainer';
import { Route, Routes } from 'react-router';
import { RootState } from 'store';
import { selectConstructedSpendingMap } from 'store/selectors/componentSelectors/spendingAnalysisSelectors';

import FilterBar from './components/FilterBar/components/FilterBar';
import SpendingByCategoryPage from './components/pages/SpendingAnalysisPage';

// eslint-disable-next-line
const App = () => {
  // populate the store on app render
  useGetAllBudgetMonthsQuery();
  useGetCategoriesQuery();
  useGetTransactionsQuery();
  useGetAccountsQuery();

  const x = useSelector((state: RootState) => selectConstructedSpendingMap(state));

  return (
    <AppContainer>
      <FilterBar />
      <Routes>
        <Route path='/' element={<SpendingByCategoryPage />} />
      </Routes>
    </AppContainer>
  );
};

export default App;
