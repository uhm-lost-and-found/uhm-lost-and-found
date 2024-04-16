import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { TrashFill } from 'react-bootstrap-icons';

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
          className="btn text-white"
          data-bs-toggle="modal"
          data-bs-target={lostObject._id}
          style={{ backgroundColor: "#00502f", borderRadius: 60 }}>
          Read More
        </button>
        {/* {currentUser ? ([
          <>
            <a href='/edit/${lostObject._id}'>
              <button
                className="btn btn-primary text-white mx-1"
                style={{ borderRadius: 60 }}>
                Edit
              </button>
            </a>
            
            <button
              className="btn btn-danger text-white"
              style={{ borderRadius: 60 }}>
              Remove
            </button>
          </>
        ]) : ''} */}

        {/* <Card.Header>
          <Card.Title>{lostObject.name}</Card.Title>
          <Card.Subtitle>Date Found: {lostObject.dateFound}</Card.Subtitle>
          <Card.Subtitle>Location Found: {lostObject.locationFound}</Card.Subtitle>
          <Card.Subtitle>Current Location: {lostObject.currentDepartment}</Card.Subtitle>
          <Row>
            <Col>
              <Link to={`/edit/${lostObject._id}`}>Edit</Link>
              <Button variant="danger" size="sm" className="m-2">
                <Trash />
              </Button>
            </Col>
          </Row>
        </Card.Header> */}
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
