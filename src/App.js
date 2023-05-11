import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { AppContainer } from 'libs/reuse/containers/AppContainer';
import { Route, Routes } from 'react-router';
import { fetchCategoriesThunk } from 'store';
import { fetchTransactionsThunk } from 'store';
import { fetchAccountsThunk } from 'store';

import FilterBar from './components/FilterBar/components/FilterBar';
import SpendingByCategoryPage from './components/SpendingByCategoryReport/components';

const App = () => {
  // populate the store on app render
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAccountsThunk());
    dispatch(fetchTransactionsThunk());
    dispatch(fetchCategoriesThunk());
  }, [dispatch]);

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
