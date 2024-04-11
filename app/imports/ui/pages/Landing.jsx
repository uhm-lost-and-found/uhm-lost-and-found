import React from 'react';
import { Container, Image, Row, Col, Card } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <>
    <Image src="https://manoa.hawaii.edu/library/wp-content/uploads/2017/10/Sunny-Alcove.jpg" style={{ width: '100vw', height: '100vh', filter: 'brightness(0.6)', position: 'absolute', zIndex: -1, objectFit: 'cover' }} />
    <Container id="landing-page" className="py-3">
      <Row className="align-middle text-center">
        <Col>
          <h1 className="text-white" style={{ fontSize: '160px', fontWeight: 600 }}>Lost and Found</h1>
          <a id="home-button" href="/list">Locate Lost Items</a>
        </Col>
      </Row>
      <Row className="mt-5 text-white">
        <Col>
          <Image style={{ borderRadius: 10 }} fluid src="/images/item-page.png" />
        </Col>
        <Col>
          <h2>Reclaim your lost items.</h2>
          <p>Welcome to the Lost and Found web application! This platform serves as a centralized catalog/database for lost items within the university community. Whether you're a student or faculty member, this user-friendly tool is designed to streamline the process of finding lost belongings.</p>
          <p>Browse Lost Items: You can easily browse through the catalog of lost items to locate your missing belongings.</p>
          <p>View Item Details: Detailed information about each lost item, including where it was found and where it is located, is readily available for you.</p>
        </Col>
      </Row>
    </Container>
  </>
);

export default Landing;
