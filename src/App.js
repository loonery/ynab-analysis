import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { AppContainer } from 'libs/reuse/containers/AppContainer';
import { Route, Routes } from 'react-router';

import FilterBar from './components/FilterBar/components/FilterBar';
import SpendingByCategoryPage from './components/Pages/SpendingAnalysisPage';

const App = () => {
  // populate the store on app render
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('pass');
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
