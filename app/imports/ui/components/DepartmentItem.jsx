import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody, Button, Modal } from 'react-bootstrap';
import { deleteDepartment } from '../../startup/both/Methods';

/** Renders a single row in the List Stuff table. See pages/ListItems.jsx. */
const DepartmentItem = ({ department }) => {

  const [showModal, setShowModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const handleFailureClose = () => setShowFailureModal(false);
  const handleFailureShow = () => setShowFailureModal(true);

  const removeItem = (userID) => {
    handleClose();
    console.log(`The account to remove is ${userID}`);
    Meteor.call(deleteDepartment, userID, (err, result) => {
      if (err) {
        console.log(err.reason);
      }
      if (!result) {
        handleFailureShow();
      }
    });
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <h3>{department.username}</h3>
      </CardHeader>
      <CardBody>
        <p><strong>Email: </strong>{department.emails[0].address}</p>
        <p><strong>Date Created: </strong>{department.createdAt.toLocaleDateString()}</p>
      </CardBody>
      <Button
        variant="danger"
        onClick={handleShow}
        style={{ borderRadius: 60, border: 'none' }}
        className="mx-4 mb-3"
      >
        Delete Department Account
      </Button>
      <Modal
        show={showModal}
        onHide={handleClose}
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header style={{ borderColor: '#282828', backgroundColor: '#DC3545' }}>
          <Modal.Title>
            <h1 style={{ color: 'white' }}>STOP!!!</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Deleting Department Account: {department.username}</h5>
          <p><strong>Are you sure? There is no going back.</strong></p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" style={{ borderRadius: 60, border: 'none' }} onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" style={{ borderRadius: 60, border: 'none' }} onClick={() => removeItem(department._id)}>
            CONFIRM DELETE
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showFailureModal}
        onHide={handleFailureClose}
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header style={{ borderColor: '#282828', backgroundColor: '#DC3545' }}>
          <Modal.Title>
            <h1 style={{ color: 'white' }}>Failure</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>You cannot delete your own account bruh</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" style={{ borderRadius: 60, border: 'none' }} onClick={handleFailureClose}>
            My Bad
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

// Require a document to be passed to this component.
DepartmentItem.propTypes = {
  department: PropTypes.shape({
    username: PropTypes.string,
    emails: PropTypes.arrayOf(PropTypes.shape({
      address: PropTypes.string,
      verified: PropTypes.bool,
    })),
    createdAt: PropTypes.instanceOf(Date),
    _id: PropTypes.string,
  }).isRequired,
};

export default DepartmentItem;
