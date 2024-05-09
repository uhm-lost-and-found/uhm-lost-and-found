import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
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
        <Container id="signin-page" className="py-3" fluid style={{ paddingTop: '50px', paddingBottom: '50px' }}>
          {/* Adjusted paddingBottom */}
          <Row className="justify-content-center">
            <Col xs={5} className="mt-2">
              <Col className="text-center">
                <h2 style={{ color: 'white' }}>Login to your account</h2>
              </Col>
              <AutoForm schema={bridge} onSubmit={data => submit(data)}>
                <Card className="shadow" data-aos="fade-up" data-aos-duration="2000" data-aos-once="true">
                  <Card.Body>
                    <TextField id="signin-form-email" name="email" placeholder="E-mail address" />
                    <TextField id="signin-form-password" name="password" placeholder="Password" type="password" />
                    <ErrorsField />
                    <SubmitField id="signin-form-submit" />
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
