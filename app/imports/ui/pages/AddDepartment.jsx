import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Alert, Card, Col, Container, Row, Button } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { addDepartment } from '../../startup/both/Methods';

const AddDepartment = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const schema = new SimpleSchema({
    email: String,
    password: String,
  });
  const bridge = new SimpleSchema2Bridge(schema);

  const submit = (doc) => {
    Meteor.call(addDepartment, doc, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setError('');
        setSuccess(true);
      }
    });
  };

  const handleSuccessButtonClick = () => {
    setSuccess(false);
  };

  return (
    <div>
      {!success ? (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <div style={{ flex: '1 0 auto', position: 'relative', overflow: 'hidden' }}>
            <img
              src="images/login-bg.jpeg"
              alt="Background"
              style={{
                width: '100%',
                height: '100vh',
                objectFit: 'cover',
                position: 'fixed',
                zIndex: -1,
                top: 0,
                left: 0,
              }}
            />
            <Container id="signup-page" className="py-3" fluid style={{ paddingTop: '50px', paddingBottom: '50px' }}>
              <Row className="justify-content-center">
                <Col xs={5} className="mt-2">
                  <Col className="text-center">
                    <h2 style={{ color: 'white' }}>Register Department</h2>
                  </Col>
                  <AutoForm schema={bridge} onSubmit={data => submit(data)}>
                    <Card>
                      <Card.Body>
                        <TextField name="email" placeholder="Department e-mail address" />
                        <TextField name="password" placeholder="Temp password" type="password" />
                        <ErrorsField />
                        <SubmitField />
                      </Card.Body>
                    </Card>
                  </AutoForm>
                  {error === '' ? (
                    ''
                  ) : (
                    <Alert variant="danger">
                      <Alert.Heading>Registration was not successful</Alert.Heading>
                      {error}
                    </Alert>
                  )}
                </Col>
              </Row>
            </Container>
          </div>
          <footer style={{ flexShrink: 0 }}>
            {/* Your footer content goes here */}
          </footer>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <div style={{ flex: '1 0 auto', position: 'relative', overflow: 'hidden' }}>
            <img
              src="images/login-bg.jpeg"
              alt="Background"
              style={{
                width: '100%',
                height: '100vh',
                objectFit: 'cover',
                position: 'fixed',
                zIndex: -1,
                top: 0,
                left: 0,
              }}
            />
            <Container id="signup-page" className="py-3" fluid style={{ paddingTop: '50px', paddingBottom: '50px' }}>
              <Row className="justify-content-center">
                <Col xs={5} className="mt-2">
                  <Col className="text-center">
                    <h2 style={{ color: 'white' }}>Register Department</h2>
                  </Col>
                  <Col className="text-center">
                    <h4 style={{ color: 'white' }}>Good Job :D</h4>
                    <Button onClick={handleSuccessButtonClick} />
                  </Col>
                </Col>
              </Row>
            </Container>
          </div>
          <footer style={{ flexShrink: 0 }}>
            {/* Your footer content goes here */}
          </footer>
        </div>
      )};
    </div>
  );
};

AddDepartment.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.string,
  }),
};

AddDepartment.defaultProps = {
  location: { state: '' },
};

export default AddDepartment;
