import React from 'react';
import { Container, Image, Row, Col } from 'react-bootstrap';

const Landing = () => (
  <>
    {/* Background image */}
    <Image src="https://manoa.hawaii.edu/library/wp-content/uploads/2017/10/Sunny-Alcove.jpg" style={{ width: '100vw', filter: 'brightness(0.6)', position: 'absolute', zIndex: -1 }} />
    {/* Content container */}
    <div style={{ position: 'relative', minHeight: 'calc(100vh - 56px)' }}>
      <Container fluid className="py-3">
        <Row className="align-items-center justify-content-center">
          <Col className="text-center">
            <h1 className="text-white mt-5" style={{ fontSize: '160px', fontWeight: 600 }}>Lost and Found</h1>
            <a id="home-button" href="/list">Locate Lost Items</a>
          </Col>
        </Row>
      </Container>
    </div>
  </>
);

export default Landing;
