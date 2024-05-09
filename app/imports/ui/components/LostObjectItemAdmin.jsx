import React from 'react';
import PropTypes from 'prop-types';
import { Card, Modal, Button } from 'react-bootstrap';

/** Renders a single row in the List Stuff table. See pages/ListItems.jsx. */
const LostObjectItemAdmin = ({ lostObject, collection }) => {
  // eslint-disable-next-line no-unused-vars
  const removeItem = (docID) => {
    console.log(`The item to remove is ${docID}`);
    collection.remove(docID);
  };

  const [showModal, setShowModal] = React.useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <Card className="h-100 shadow">
      <Card.Img className="object-image" src={lostObject.image} alt={lostObject.name} />
      <Card.Body>
        <Card.Title>{lostObject.name}</Card.Title>
        <Card.Subtitle>{lostObject.currentDepartment}</Card.Subtitle>
        <Card.Text>
          Date Found: {lostObject.dateFound}
          <br />
          Location Found: {lostObject.locationFound}
        </Card.Text>
        <Button
          variant="primary"
          onClick={handleShow}
          style={{ backgroundColor: '#00502f', borderRadius: 60, border: 'none' }}
        >
          Read More
        </Button>
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

        <Modal
          show={showModal}
          onHide={handleClose}
          centered
          scrollable
          className="text-black"
        >
          <Modal.Header closeButton style={{ borderColor: '#282828', backgroundColor: '#282828' }}>
            <Modal.Title>
              <h6 style={{ color: 'd3d3d3' }}>{lostObject.name}</h6>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Example Text
          </Modal.Body>
        </Modal>

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
