
import { Route, Routes } from 'react-router'
import SpendingAnalysisDashboard from './components/SpendingAnalysisDashboard/';

const App = () => {
  return (
    <div className="container border mx-4 my-4">
      <Routes>
        <Route path='/' element={<SpendingAnalysisDashboard/>}/>
      </Routes>
    </div>
  );
}

export default App;