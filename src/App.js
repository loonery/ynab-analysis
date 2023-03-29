import { Route, Routes } from 'react-router'
import FilterBar from './components/FilterBar/FilterBar';
import SpendingByCategoryReport from './components/SpendingByCategoryReport';

const App = () => {
  return (
    <div className='row'>
      <div className='col'>
          <FilterBar />
          <Routes>
            <Route path='/' element={<SpendingByCategoryReport />}/>
          </Routes>
      </div>
    </div>
  );
}

export default App;