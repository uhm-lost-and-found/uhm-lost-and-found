import React from 'react';
import { Container, Image, Row, Col, Card } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <>
    <Image src="https://manoa.hawaii.edu/library/wp-content/uploads/2017/10/Sunny-Alcove.jpg" style={{ width: '100vw', height: '100vh', filter: 'brightness(0.6)', position: 'absolute', zIndex: -1, objectFit: 'cover' }} />
    <Container id="landing-page" className="py-3">
      <Row className="align-middle text-center">
        <Col>
          <h1 className="text-white mt-5" style={{ fontSize: '160px', fontWeight: 600 }}>Lost and Found</h1>
          <a id="home-button" href="/list">Locate Lost Items</a>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <Card>
            <h1>User Guide</h1>

          </Card>
        </Col>
      </Row>
    </Container>
  </>
);

export default Landing;
