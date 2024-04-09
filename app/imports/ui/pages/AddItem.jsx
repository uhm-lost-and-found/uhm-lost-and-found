import React, { useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Stuffs } from '../../api/stuff/Stuff';

const formSchema = new SimpleSchema({
  name: String,
  dateFound: Date,
  locationFound: String,
  currentDepartment: String,
  image: {
    type: String,
    optional: true,
  },
  _id: String,
  owner: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

const AddItem = () => {
  const [imagePreview, setImagePreview] = useState(null);

  const submit = (data, formRef) => {
    const { name, dateFound, locationFound, currentDepartment, image } = data;
    const owner = Meteor.user().username;
    Stuffs.collection.insert(
      { name, dateFound, locationFound, currentDepartment, image, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
          setImagePreview(null);
        }
      },
    );
  };

  const handleImagePreview = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  let fRef = null;
  return (
    <div style={{ position: 'relative', overflow: 'hidden', height: '100vh' }}>
      <img
        src="https://manoa.hawaii.edu/library/wp-content/uploads/2017/10/Sunny-Alcove.jpg"
        alt="Background"
        style={{
          width: '100%',
          height: '100vh',
          objectFit: 'cover',
          filter: 'brightness(0.6)',
          position: 'fixed',
          zIndex: -1,
          top: 0,
          left: 0,
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Container fluid className="py-3">
          <Row className="justify-content-center">
            <Col xs={8}>
              <Col className="text-center">
                <h2 style={{ color: 'white' }}>Add Item</h2>
              </Col>
              <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
                <Card>
                  <Card.Body>
                    <Row>
                      <Col md={6}>
                        <TextField name="name" />
                        <TextField name="dateFound" type="date" label="Date Found" />
                        <TextField name="locationFound" label="Location Found" />
                        <TextField name="currentDepartment" label="Current Department" />
                      </Col>
                      <Col md={6}>
                        {imagePreview && <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />}
                        <div>Image</div>
                        <input type="file" accept="image/*" onChange={handleImagePreview} />
                        <TextField name="_id" />
                        <TextField name="owner" />
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
    </div>
  );
};

export default AddItem;
