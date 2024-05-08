import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody, Button } from 'react-bootstrap';

/** Renders a single row in the List Stuff table. See pages/ListItems.jsx. */
const DepartmentItem = ({ department }) => {

  const removeItem = (docID) => {
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
        onClick={() => removeItem(department._id)}
        style={{ borderRadius: 60, border: 'none' }}
      >
        Delete Department Account
      </Button>
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
