import React from 'react';

import { Row, Col } from 'react-bootstrap';
import { Route, Routes } from 'react-router';

import FilterBar from './components/FilterBar/components/FilterBar';
import SpendingByCategoryReport from './components/SpendingByCategoryReport/components';

const App = () => {
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
