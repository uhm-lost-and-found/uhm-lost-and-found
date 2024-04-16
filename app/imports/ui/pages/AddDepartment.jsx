import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Navigate } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';

const AddDepartment = ({ location }) => {
  const [error, setError] = useState('');
  const [redirectToReferer, setRedirectToRef] = useState(false);

  const schema = new SimpleSchema({
    email: String,
    password: String,
  });
  const bridge = new SimpleSchema2Bridge(schema);

  const submit = (doc) => {
    const { email, password } = doc;
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setError('');
        setRedirectToRef(true);
      }
    });
  };

  const { from } = location?.state || { from: { pathname: '/add' } };
  if (redirectToReferer) {
    return <Navigate to={from} />;
  }

  return (
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
                    <TextField name="password" placeholder="Password" type="password" />
                    <ErrorsField />
                    <SubmitField />
                    <div style={{ textAlign: 'center', marginTop: '10px' }}>
                      <Alert variant="light">
                        Already have an account? <Link to="/signin">Login here.</Link>
                      </Alert>
                    </div>
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
