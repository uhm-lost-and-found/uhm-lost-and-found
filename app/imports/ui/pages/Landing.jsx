import React from 'react';
import { Container, Image, Row, Col } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();
/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <>
    <div className="div position-relative pb-5 text-white border-bottom shadow">
      <Image
        className="img-fluid"
        src="https://manoa.hawaii.edu/library/wp-content/uploads/2017/10/Sunny-Alcove.jpg"
        alt="Banner"
        style={{
          width: '100vw',
          maxHeight: '100%',
          minHeight: '100%',
          filter: 'brightness(0.5)',
          position: 'absolute',
          zIndex: -1,
          objectFit: 'cover',
        }}
      />
      <Container id="landing-page" data-aos="fade-up" data-aos-duration="2000">
        <Row className="align-middle text-center mt-5">
          <Col>
            <h1 style={{ fontSize: '150px', fontWeight: 600 }}>Lost and Found</h1>
            <a id="home-button" href="/list">Locate Lost Items</a>
          </Col>
        </Row>
      </Container>
    </div>
    <div className="mt-5 py-5" style={{ backgroundColor: '#FFFFFF' }}>
      <Container className="my-5" data-aos="fade-in" data-aos-duration="2000" data-aos-once="true">
        <Row className="align-items-center">
          <Col xs={12} md={6} className="text-center">
            <p className="ex-button">Locate Lost Items</p>
          </Col>
          <Col md={1} />
          <Col xs={12} md={5}>
            <h1>How to Use</h1>
            <h4 className="lead fs-5 text-secondary">
              Welcome to our Lost and Found service! Utilize our platform&apos;s
              &quot;Locate Lost Items&quot; button to search for misplaced 
              belongings. Our user-friendly interface ensures a seamless experience, 
              making it easier for you to find what you&apos;re looking for.
            </h4>
          </Col>
        </Row>
      </Container>
    </div>
    <div className="mt-5 py-5" style={{ backgroundColor: '#F6F6F6' }}>
      <Container className="my-5" data-aos="fade-in" data-aos-duration="2000" data-aos-once="true">
        <Row className="align-items-center">
          <Col md={5}>
            <h1>Explore Our Catalog</h1>
            <h4 className="lead fs-5 text-secondary">
              Discover lost items and their details effortlessly. Simply
              browse through our catalog, click on an item to view more
              information, and press &quot;Read More&quot; for additional details
              such as where the item was found, when it was found, its
              current location, an image of the item, and more.
            </h4>
          </Col>
          <Col md={1} />
          <Col md={6}>
            <Image className="img-fluid rounded shadow" src="./images/catalog.png" alt="Catalog" />
          </Col>
        </Row>
      </Container>
    </div>
  </>
);

export default Landing;
