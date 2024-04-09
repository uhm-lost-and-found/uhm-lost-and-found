import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from 'react-bootstrap';

/** Renders a single row in the List Stuff table. See pages/ListItems.jsx. */
const LostObjectItem = ({ lostObject }) => (
  <Card className="h-100">
    <Card.Header>
      <Card.Title>{lostObject.name}</Card.Title>
      <Image src={lostObject.image} width={75} />
      <Card.Subtitle>{lostObject.dateFound}</Card.Subtitle>
      <Card.Subtitle>{lostObject.locationFound}</Card.Subtitle>
      <Card.Subtitle>{lostObject.currentDepartment}</Card.Subtitle>
    </Card.Header>
  </Card>
);

// Require a document to be passed to this component.
LostObjectItem.propTypes = {
  lostObject: PropTypes.shape({
    name: PropTypes.string,
    dateFound: PropTypes.instanceOf(Date),
    locationFound: PropTypes.string,
    currentDepartment: PropTypes.string,
    image: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default LostObjectItem;
