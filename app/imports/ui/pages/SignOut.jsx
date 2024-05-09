import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';

/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const SignOut = () => {
  Meteor.logout();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div style={{ flex: '1 0 auto', position: 'relative', overflow: 'hidden' }}>
        <Container id="signout-page" className="py-3" fluid style={{ marginTop: '200px', marginBottom: '200px' }} data-aos="fade-up" data-aos-duration="2000" data-aos-once="true">
          <Row className="justify-content-center align-items-center">
            <Col className="text-center py-3">
              <h2 className="lead fs-1">You are signed out.</h2>
            </Col>
          </Row>
        </Container>
      </div>
      <footer style={{ flexShrink: 0 }}>
        {/* Your footer content goes here */}
      </footer>
    </div>
  );
};

export default SignOut;
