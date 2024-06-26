import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import { LostObjects } from '../../api/lostobject/LostObject';
import LoadingSpinner from '../components/LoadingSpinner';

const bridge = new SimpleSchema2Bridge(LostObjects.schema);

const EditItem = () => {
  const { _id } = useParams();
  const { doc, ready } = useTracker(() => {
    const subscription = Meteor.subscribe(LostObjects.departmentPublicationName);
    const rdy = subscription.ready();
    const document = LostObjects.collection.findOne(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);

  const submit = (data) => {
    const { name, dateFound, locationFound, currentDepartment, owner, image } = data;
    LostObjects.collection.update(_id, { $set: { name, dateFound, locationFound, currentDepartment, owner, image } }, (error) => (
      error ? swal('Error', error.message, 'error') : swal('Success', 'Item updated successfully', 'success')
    ));
  };

  const isAdmin = Meteor.user()?.emails[0].address === 'admin@foo.com';

  return ready && doc ? (
    <div style={{ position: 'relative', overflow: 'hidden', height: '100vh' }}>
      <Container fluid className="py-3">
        <Row className="justify-content-center">
          <Col xs={8}>
            <Col className="text-center">
              <h2 style={{ color: 'white' }}>Edit Item</h2>
            </Col>
            <AutoForm schema={bridge} onSubmit={submit} model={doc}>
              <Card>
                <Card.Body>
                  <Row>
                    <Col md={6}>
                      <TextField name="name" />
                      <TextField name="dateFound" label="Date Found" placeholder="DD/MM/YYYY" />
                      <TextField name="locationFound" label="Location Found" />
                      <TextField name="currentDepartment" label="Current Location" />
                    </Col>
                    <Col md={6}>
                      <TextField name="image" label="Image URL" />
                      <TextField name="owner" disabled={!isAdmin} />
                    </Col>
                  </Row>
                  <SubmitField value="Submit" />
                  <ErrorsField />
                </Card.Body>
              </Card>
            </AutoForm>
          </Col>
        </Row>
      </Container>
    </div>
  ) : <LoadingSpinner />;
};

export default EditItem;
