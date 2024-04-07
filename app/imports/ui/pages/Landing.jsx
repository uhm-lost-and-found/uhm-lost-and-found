import React from 'react';
import { Container, Image, Row } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <>
    <Image src="https://manoa.hawaii.edu/library/wp-content/uploads/2017/10/Sunny-Alcove.jpg" style={{ width: '99vw', filter: 'brightness(0.6)', position: 'absolute', zIndex: -1 }} />
    <Container id="landing-page" fluid className="py-3">
      <Row className="align-middle text-center" />
    </Container>
  </>
);

export default Landing;
