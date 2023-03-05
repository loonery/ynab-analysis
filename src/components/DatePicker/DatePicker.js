import React, { useState, Fragment } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import 'react-datepicker/dist/react-datepicker-cssmodules.css'

const DashboardDatePicker = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    return (
      <Fragment>
        <Container>
          <Row>
            <Col><Form.Control type="date" value={startDate}/></Col>
            <Col><Form.Control type="date" value={startDate}/></Col>
          </Row>
        </Container>
      </Fragment>
    );
}
export default DashboardDatePicker;