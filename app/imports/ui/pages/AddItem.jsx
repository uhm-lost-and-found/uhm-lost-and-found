import React, { useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { LostObjects } from '../../api/lostobject/LostObject';

const formSchema = new SimpleSchema({
  name: String,
  dateFound: Date,
  locationFound: String,
  currentDepartment: String,
  image: String,
  owner: {
    type: String,
    optional: true,
    autoValue() {
      if (this.isInsert && !this.isFromTrustedCode) {
        return Meteor.user() ? Meteor.user().username : null;
      }
      return this.value;
    },
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

const AddItem = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);

  const handleSubmit = (data, formRef) => {
    const { name, dateFound, locationFound, currentDepartment, owner } = data;

    console.log('Image state:', image); // Add this console log here

    if (!image) {
      swal('Error', 'Image is required', 'error');
      return;
    }

    LostObjects.collection.insert(
      { name, dateFound, locationFound, currentDepartment, image, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
          setImagePreview(null);
          setImage(null);
        }
      },
    );
  };

  const handleImagePreview = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setImage(file); // Set the image state with the uploaded file
        console.log('Image:', file); // Add this console log here
        console.log('ImagePreview:', reader.result); // Add this console log here
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
      setImage(null);
    }
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
              <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => handleSubmit(data, fRef)}>
                <Card>
                  <Card.Body>
                    <Row>
                      <Col md={6}>
                        <TextField name="name" />
                        <TextField name="dateFound" type="date" label="Date Found" />
                        <TextField name="locationFound" label="Location Found" />
                        <TextField name="currentDepartment" label="Current Location" />
                      </Col>
                      <Col md={6}>
                        {imagePreview && <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />}
                        <div>Image</div>
                        <input type="file" accept="image/*" onChange={handleImagePreview} />
                        <div style={{ marginBottom: '24px' }} />
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
