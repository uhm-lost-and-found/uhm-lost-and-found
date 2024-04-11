import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { Trash } from 'react-bootstrap-icons';

/** Renders a single row in the List Stuff table. See pages/ListItems.jsx. */
const LostObjectItem = ({ lostObject, collection }) => {
  const removeItem = () => {
    console.log(`The item to remove is ${lostObject._id}`);
    collection.remove(lostObject._id);
  };
  return (
    <Card className="h-100 d-flex flex-column justify-content-center align-items-center">
      <Card.Body className="text-center">
        <Card.Header>
          <Card.Title>{lostObject.name}</Card.Title>
          <Image src={lostObject.image} width={75} height={75} />
          <Card.Subtitle>Date Found: {lostObject.dateFound}</Card.Subtitle>
          <Card.Subtitle>Location Found: {lostObject.locationFound}</Card.Subtitle>
          <Card.Subtitle>Current Location: {lostObject.currentDepartment}</Card.Subtitle>
          <Row>
            <Col>
              <Link to={`/edit/${lostObject._id}`}>Edit</Link>
              <Button variant="danger" size="sm" onClick={() => removeItem(lostObject._id)} className="m-2">
                <Trash />
              </Button>
            </Col>
          </Row>
        </Card.Header>
      </Card.Body>
    </Card>
  );
};

// Require a document to be passed to this component.
LostObjectItem.propTypes = {
  lostObject: PropTypes.shape({
    name: PropTypes.string,
    dateFound: PropTypes.string,
    locationFound: PropTypes.string,
    currentDepartment: PropTypes.string,
    image: PropTypes.string,
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  collection: PropTypes.object.isRequired,
};

export default LostObjectItem;
