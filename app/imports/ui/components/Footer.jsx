import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Footer = () => {
  const openSocialLink = (url) => {
    window.open(url, '_blank');
  };

  return (
    <footer style={{ padding: '5px', backgroundColor: 'black', color: 'white', position: 'fixed', bottom: '0', width: '100%', zIndex: '1000' }}>
      <Container>
        <Row>
          <Col>
            <h6 className="mb-1">Lost and Found at the University of Hawaii at Manoa</h6>
            <p className="mb-1">All rights reserved.</p>
          </Col>
          <Col>
            <h6 className="mb-1">Quick Links</h6>
            <div className="mb-1">Home</div>
            <div className="mb-1">Lost Items</div>
            <div className="mb-1">Claim Found Item</div>
          </Col>
          <Col>
            <h6 className="mb-1">Contact</h6>
            <p className="mb-1">Department of Information and Computer Sciences</p>
            <p className="mb-1">University of Hawaii</p>
            <p className="mb-1">Honolulu, HI 96822</p>
            <p className="mb-1">Contact: lostandfound@hawaii.edu</p>
          </Col>
          <Col>
            <div>
              <h6 className="mb-1">Follow Us on Social Media</h6>
            </div>
            <div>
              <Button variant="link" className="social-icon me-2" onClick={() => openSocialLink('https://www.instagram.com/uhm_ics/')} style={{ fontSize: '24px' }}>
                <i className="bi bi-instagram" />
              </Button>
              <Button variant="link" className="social-icon" onClick={() => openSocialLink('https://twitter.com/uhmics?lang=en')} style={{ fontSize: '24px' }}>
                <i className="bi bi-twitter" />
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
