import React from 'react';

import {
  useGetAccountsQuery,
  useGetAllBudgetMonthsQuery,
  useGetTransactionsQuery,
} from 'api/ynabApi';
import { useGetCategoriesQuery } from 'api/ynabApi';
import { AppContainer } from 'libs/reuse/containers/AppContainer';
import { Route, Routes } from 'react-router';

import FilterBar from './components/FilterBar/components/FilterBar';
import SpendingByCategoryPage from './components/pages/SpendingAnalysisPage';

// eslint-disable-next-line
const App = () => {
  // populate the store on app render
  useGetCategoriesQuery();
  useGetTransactionsQuery();
  useGetAccountsQuery();
  useGetAllBudgetMonthsQuery();

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
