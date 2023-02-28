
import { Route, Routes } from 'react-router'
import SpendingAnalysisDashboard from './components/SpendingAnalysisDashboard/';

const App = () => {
  return (
    <div className="container">
      <Routes>
        <Route path='/' element={<SpendingAnalysisDashboard/>}/>
      </Routes>
    </div>
  );
}

export default App;