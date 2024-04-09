import React from 'react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListItemsAdmin.jsx. */
const StuffItemAdmin = ({ stuff }) => (
  <tr>
    <td>{stuff.name}</td>
    <td>{stuff.dateFound.toLocaleDateString()}</td> {/* Adjusted toLocaleDateString */}
    <td>{stuff.locationFound}</td>
    <td>{stuff.currentDepartment}</td>
    <td>{stuff.image}</td>
    <td>{stuff._id}</td>
    <td>{stuff.owner}</td>
  </tr>
);

// Require a document to be passed to this component.
StuffItemAdmin.propTypes = {
  stuff: PropTypes.shape({
    name: PropTypes.string,
    dateFound: PropTypes.instanceOf(Date), // Adjusted to instanceOf(Date)
    locationFound: PropTypes.string,
    currentDepartment: PropTypes.string,
    image: PropTypes.string,
    _id: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
};

export default StuffItemAdmin;
