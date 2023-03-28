import { Route, Routes } from 'react-router'
import FilterBar from './components/FilterBar/FilterBar';
import SpendingAnalysisDashboard from './components/SpendingAnalysisDashboard';

const App = () => {
  return (
    <div className='row'>
      <div className='col'>
          <Routes>
            <Route path='/' element={<FilterBar />}/>
          </Routes>
      </div>
    </div>
  );
}

export default App;