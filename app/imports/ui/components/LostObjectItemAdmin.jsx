import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListItems.jsx. */
const LostObjectItemAdmin = ({ lostObject }) => (
  <Card className="h-100 d-flex flex-column justify-content-center align-items-center">
    <Card.Body className="text-center">
      <Card.Header>
        <Card.Title>{lostObject.name}</Card.Title>
        <Image src={lostObject.image} width={75} height={75} />
        <Card.Subtitle>Date Found: {lostObject.dateFound}</Card.Subtitle>
        <Card.Subtitle>Location Found: {lostObject.locationFound}</Card.Subtitle>
        <Card.Subtitle>Current Location: {lostObject.currentDepartment}</Card.Subtitle>
        <Link to={`/edit/${lostObject._id}`}>Edit</Link>
      </Card.Header>
    </Card.Body>
  </Card>

);

// Require a document to be passed to this component.
LostObjectItemAdmin.propTypes = {
  lostObject: PropTypes.shape({
    name: PropTypes.string,
    dateFound: PropTypes.string,
    locationFound: PropTypes.string,
    currentDepartment: PropTypes.string,
    image: PropTypes.string,
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default LostObjectItemAdmin;
