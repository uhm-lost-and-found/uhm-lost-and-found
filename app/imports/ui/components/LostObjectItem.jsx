import React from 'react';
import PropTypes from 'prop-types';
import { Card, Modal, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

const LostObjectItem = ({ lostObject }) => {
  // eslint-disable-next-line no-unused-vars
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

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
