import React, { useEffect } from 'react';
import { Container, Image, Row, Col } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();
/* A simple static component to render some text for the landing page. */
const Landing = () => (

  <>
    <Image src="https://manoa.hawaii.edu/library/wp-content/uploads/2017/10/Sunny-Alcove.jpg" style={{ width: '100vw', height: '100vh', filter: 'brightness(0.6)', position: 'absolute', zIndex: -1, objectFit: 'cover' }} />
    <Container id="landing-page" className="py-3">
      <div data-aos="fade-up" data-aos-duration="2000">
        <Row className="align-middle text-center">
          <Col>
            <h1 className="text-white" style={{ fontSize: '160px', fontWeight: 600 }}>Lost and Found</h1>
            <a id="home-button" href="/list">Locate Lost Items</a>
          </Col>
        </Row>
      </div>
      <Row className="mt-5 text-white">
        <Col>
          <Image style={{ borderRadius: 10, height: 225, display: 'block', margin: 'auto' }} className="justify-content-center" fluid src="/images/airpods.png" />
        </Col>
        <Col>
          <h3>Reclaim your lost items.</h3>
          <p>Welcome to the Lost and Found web application! This platform serves as a centralized catalog/database for lost items within the university community.</p>
          <p>Browse Lost Items: You can easily browse through the catalog of lost items to locate your missing belongings.</p>
          <p>View Item Details: Detailed information about each lost item, including where it was found and where it is located, is readily available for you.</p>
        </Col>
      </Row>
    </Container>
  </>
);

export default Landing;
