import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from 'react-bootstrap';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
const LostObjectItemAdmin = ({ lostObject }) => (
  <Card className="h-100">
    <Card.Header>
      <Card.Title>{lostObject.name}</Card.Title>
      <Image src={lostObject.image} width={75} />
      <Card.Subtitle>{lostObject.dateFound}</Card.Subtitle>
      <Card.Subtitle>{lostObject.locationFound}</Card.Subtitle>
      <Card.Subtitle>{lostObject.currentDepartment}</Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <footer className="blockquote-footer">{lostObject.owner}</footer>
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
    _id: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
};

export default LostObjectItemAdmin;
