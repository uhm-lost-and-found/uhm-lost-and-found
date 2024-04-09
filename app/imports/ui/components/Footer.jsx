import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => (
  <footer className="footer">
    <Container style={{ paddingLeft: '20px', paddingRight: '20px', marginTop: '2px' }}>
      <Row className="align-items-start justify-content-center">
        <Col xs={12} md={3} className="mb-3 mb-md-0 text-start">
          <img
            src="https://manoa.hawaii.edu/wp/wp-content/uploads/2017/10/uhm-white-seal-nameplate@2x.png"
            alt="UH Manoa Logo"
            style={{ maxWidth: '100%', height: 'auto', marginLeft: '-38px' }}
          />
        </Col>
        <Col xs={12} md={3} className="mb-3 mb-md-0" style={{ paddingLeft: '90px' }}>
          <h6 className="mb-1" style={{ fontSize: '16px', marginBottom: '8px' }}>Lost and Found at the University of Hawaii at Manoa</h6>
          <p className="mb-1" style={{ fontSize: '14px', marginBottom: '8px' }}>All rights reserved.</p>
        </Col>
        <Col xs={12} md={3} className="mb-3 mb-md-0" style={{ paddingLeft: '120px' }}>
          <h6 className="mb-1" style={{ fontSize: '16px', marginBottom: '8px' }}>Quick Links</h6>
          <a href="/" className="footer-link" style={{ fontSize: '14px', color: 'white', textDecoration: 'none' }} target="_self">
            Home
          </a>
          <br />
          <a href="/list" className="footer-link" style={{ fontSize: '14px', color: 'white', textDecoration: 'none' }}>
            Lost Items
          </a>
        </Col>
        <Col xs={12} md={3} className="text-left" style={{ paddingLeft: '60px' }}>
          <h6 className="mb-1" style={{ fontSize: '16px', marginBottom: '8px' }}>Contact Us</h6>
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
