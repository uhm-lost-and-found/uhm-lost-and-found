import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

/** Renders a single row in the List Stuff table. See pages/ListItems.jsx. */
const LostObjectItemAdmin = ({ lostObject, collection }) => {
  // eslint-disable-next-line no-unused-vars
  const removeItem = (docID) => {
    console.log(`The item to remove is ${docID}`);
    collection.remove(docID);
  };

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
        <a href={`/edit/${lostObject._id}`}>
          <button
            type="button"
            className="btn btn-primary text-white mx-2"
            data-bs-toggle="modal"
            data-bs-target={lostObject._id}
            style={{ borderRadius: 60 }}
          >
            Edit
          </button>
        </a>
        <button
          type="button"
          className="btn btn-danger text-white"
          onClick={() => removeItem(lostObject._id)}
          data-bs-toggle="modal"
          data-bs-target={lostObject._id}
          style={{ borderRadius: 60 }}
        >
          Remove
        </button>
      </Card.Body>
    </Card>
  );
};

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
  // eslint-disable-next-line react/forbid-prop-types
  collection: PropTypes.object.isRequired,
};

export default LostObjectItemAdmin;
