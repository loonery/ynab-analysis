
import { Route, Routes } from 'react-router'
import SpendingAnalysis from './components/SpendingAnalysis';

const App = () => {
  return (
    <div className="container border mx-4 my-4">
      <Routes>
        <Route path='/' element={<SpendingAnalysis/>}/>
      </Routes>
    </div>
  );
}

export default App;