import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';

const SignIn = () => {
  const [error, setError] = useState('');
  const [redirect, setRedirect] = useState(false);
  const schema = new SimpleSchema({
    email: String,
    password: String,
  });
  const bridge = new SimpleSchema2Bridge(schema);

  const submit = (doc) => {
    const { email, password } = doc;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setRedirect(true);
      }
    });
  };

  if (redirect) {
    return (<Navigate to="/" />);
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
        <Container id="signin-page" className="py-3" fluid style={{ paddingTop: '50px', paddingBottom: '50px' }}>
          {/* Adjusted paddingBottom */}
          <Row className="justify-content-center">
            <Col xs={5} className="mt-2">
              <Col className="text-center">
                <h2 style={{ color: 'white' }}>Login to your account</h2>
              </Col>
              <AutoForm schema={bridge} onSubmit={data => submit(data)}>
                <Card>
                  <Card.Body>
                    <TextField id="signin-form-email" name="email" placeholder="E-mail address" />
                    <TextField id="signin-form-password" name="password" placeholder="Password" type="password" />
                    <ErrorsField />
                    <SubmitField id="signin-form-submit" />
                    <div style={{ textAlign: 'center', marginTop: '10px' }}>
                      <Alert variant="light">
                        <Link to="/signup">Click here to register.</Link>
                      </Alert>
                    </div>
                  </Card.Body>
                </Card>
              </AutoForm>
              {error === '' ? (
                ''
              ) : (
                <Alert variant="danger">
                  <Alert.Heading>Login was not successful</Alert.Heading>
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

export default SignIn;
