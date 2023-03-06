
import { Route, Routes } from 'react-router'
import { Container, Row, Col } from 'react-bootstrap';
import SpendingAnalysisDashboard from './components/SpendingAnalysisDashboard/';

const App = () => {
  return (
    <Container className='border'>
      <Row>
        <Col>
          <Routes>
            <Route path='/' element={<SpendingAnalysisDashboard/>}/>
          </Routes>
        </Col>
      </Row>
    </Container>
  );
}

export default App;