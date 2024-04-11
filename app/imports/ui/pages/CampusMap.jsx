import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const CampusMap = () => (
  <Container className="py-3">
    <Row className="justify-content-center">
      <Col md={7}>
        <Col className="text-center">
          <h2>Campus Map</h2>
        </Col>
        <Row>
          <img src="/images/campus-map.png" alt="campus-map.png" />
        </Row>
      </Col>
    </Row>
  </Container>
);

export default CampusMap;
