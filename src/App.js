import { Route, Routes } from 'react-router'
import SpendingAnalysisDashboard from './components/SpendingAnalysisDashboard/';

const App = () => {
  return (
    <div className='row'>
      <div className='col'>
          <Routes>
            <Route path='/' element={<SpendingAnalysisDashboard/>}/>
          </Routes>
      </div>
    </div>
  );
}

export default App;