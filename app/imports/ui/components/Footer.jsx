import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => (
  <footer style={{ padding: '15px', backgroundColor: 'black', color: 'white', position: 'fixed', bottom: '0', width: '100%', zIndex: '1000', marginTop: '20px' }}>
    <Container style={{ paddingLeft: '20px', paddingRight: '20px' }}> {/* Adjusted padding to move the other three columns */}
      <Row className="align-items-start justify-content-center">
        <Col xs={12} md={3} className="mb-3 mb-md-0 text-start">
          <img src="https://manoa.hawaii.edu/wp/wp-content/uploads/2017/10/uhm-white-seal-nameplate@2x.png" alt="UH Manoa Logo" style={{ maxWidth: '100%', height: 'auto', marginLeft: '-38px' }} /> {/* Adjusted marginLeft to move the image */}
        </Col>
        <Col xs={12} md={3} className="mb-3 mb-md-0" style={{ paddingLeft: '90px' }}> {/* Adjusted padding to move the column */}
          <h6 className="mb-1" style={{ fontSize: '16px' }}>Lost and Found at the University of Hawaii at Manoa</h6>
          <p className="mb-1" style={{ fontSize: '14px' }}>All rights reserved.</p>
        </Col>
        <Col xs={12} md={3} className="mb-3 mb-md-0" style={{ paddingLeft: '120px' }}> {/* Adjusted padding to move the column */}
          <h6 className="mb-1" style={{ fontSize: '16px' }}>Quick Links</h6>
          <div className="mb-1" style={{ fontSize: '14px' }}>Home</div>
          <div className="mb-1" style={{ fontSize: '14px' }}>Lost Items</div>
        </Col>
        <Col xs={12} md={3} className="text-left" style={{ paddingLeft: '60px' }}> {/* Adjusted padding to move the column */}
          <h6 className="mb-1" style={{ fontSize: '16px' }}>Contact Us</h6>
          <p className="mb-1" style={{ fontSize: '14px' }}>Department of Lost and Found</p>
          <p className="mb-1" style={{ fontSize: '14px' }}>2500 Campus Road</p>
          <p className="mb-1" style={{ fontSize: '14px' }}>Honolulu, HI 96822</p>
          <p className="mb-1" style={{ fontSize: '14px' }}>Contact: lostandfound@hawaii.edu</p>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
