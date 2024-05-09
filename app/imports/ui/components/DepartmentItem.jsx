import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody, Button, Modal } from 'react-bootstrap';

const DepartmentItem = ({ department }) => {

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const handleDeleteClose = () => setShowDeleteModal(false);
  const handleDeleteShow = () => setShowDeleteModal(true);

  const removeItem = (docID) => {
    handleClose();
    handleDeleteShow();
    console.log(`The item to remove is ${docID}`);
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
        show={showDeleteModal}
        onHide={handleDeleteClose}
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header style={{ borderColor: '#282828', backgroundColor: '#198754' }}>
          <Modal.Title>
            <h1 style={{ color: 'white' }}>Success</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Successfully Deleted Department Account: {department.username}</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" style={{ borderRadius: 60, border: 'none' }} onClick={handleDeleteClose}>
            Close
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
