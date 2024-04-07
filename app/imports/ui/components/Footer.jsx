import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Footer = () => {
  const openSocialLink = (url) => {
    window.open(url, '_blank');
  };

  return (
    <footer style={{ paddingTop: '40px', paddingBottom: '40px', backgroundColor: 'black', color: 'white', position: 'fixed', bottom: '0', width: '100%', zIndex: '1000' }}>
      <Container>
        <Row>
          <Col>
            <h4 className="mb-2">Lost and Found at the University of Hawaii at Manoa</h4>
            <p className="mb-1">All rights reserved.</p>
          </Col>
          <Col>
            <h4 className="mb-2">Quick Links</h4>
            <div className="mb-1">Home</div>
            <div className="mb-1">Report Lost Item</div>
            <div className="mb-1">Claim Found Item</div>
          </Col>
          <Col>
            <h4 className="mb-2">Contact</h4>
            <p className="mb-1">Department of Information and Computer Sciences</p>
            <p className="mb-1">University of Hawaii</p>
            <p className="mb-1">Honolulu, HI 96822</p>
            <p className="mb-1">Contact: lostandfound@hawaii.edu</p>
          </Col>
          <Col>
            <h4 className="mb-2">Follow us on Social Media</h4>
            <div className="d-flex justify-content-center"> {/* Center content horizontally */}
              <Button variant="link" className="social-icon me-3" onClick={() => openSocialLink('https://www.instagram.com/uhm_ics/')}>
                Instagram
              </Button>
              <Button variant="link" className="social-icon" onClick={() => openSocialLink('https://twitter.com/uhmics?lang=en')}>
                Twitter
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
