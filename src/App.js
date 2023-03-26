import { Route, Routes } from 'react-router'
import FilterBar from './components/FilterBar/FilterBar';

const App = () => {
  return (
    <div className='row'>
      <div className='col'>
          <Routes>
            <Route index element={<FilterBar />}/>
          </Routes>
      </div>
    </div>
  );
}

export default App;