import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

/** Renders a single row in the List Stuff table. See pages/ListItems.jsx. */
const LostObjectItem = ({ lostObject }) => {
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  return (
    <Card className="h-100">
      <Card.Img className="object-image" src={lostObject.image} alt={lostObject.name} />
      <Card.Body>
        <Card.Title>{lostObject.name}</Card.Title>
        <Card.Subtitle>{lostObject.currentDepartment}</Card.Subtitle>
        <Card.Text>
          Date Found: {lostObject.dateFound}
          <br />
          Location Found: {lostObject.locationFound}
        </Card.Text>
        <button
          type="button"
          className="btn text-white"
          data-bs-toggle="modal"
          data-bs-target={lostObject._id}
          style={{ backgroundColor: '#00502f', borderRadius: 60 }}
        >
          Read More
        </button>
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
};

export default LostObjectItem;
