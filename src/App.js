import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { Row, Col } from 'react-bootstrap';
import { Route, Routes } from 'react-router';
import { fetchTransactionsThunk } from 'store';
import { fetchAccountsThunk } from 'store';

import FilterBar from './components/FilterBar/components/FilterBar';
import SpendingByCategoryReport from './components/SpendingByCategoryReport/components';

const App = () => {
  // populate the store on app render
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAccountsThunk());
    dispatch(fetchTransactionsThunk());
  }, [dispatch]);

  return (
    <div className='container py-4'>
      <Row>
        <Col>
          <FilterBar />
          <Routes>
            <Route path='/' element={<SpendingByCategoryReport />} />
          </Routes>
        </Col>
      </Row>
    </div>
  );
};

export default App;
