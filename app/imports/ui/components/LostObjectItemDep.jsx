import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Col, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Trash } from 'react-bootstrap-icons';

const LostObjectItemDep = ({ lostObject }) => (
  <Card className="h-100 d-flex flex-column justify-content-center align-items-center">
    <Card.Body className="text-center">
      <Card.Header>
        <Card.Title>{lostObject.name}</Card.Title>
        <Image src={lostObject.image} width={75} height={75} />
        <Card.Subtitle>Date Found: {lostObject.dateFound}</Card.Subtitle>
        <Card.Subtitle>Location Found: {lostObject.locationFound}</Card.Subtitle>
        <Card.Subtitle>Current Location: {lostObject.currentDepartment}</Card.Subtitle>
        <Row>
          <Col>
            <Link to={`/edit/${lostObject._id}`}><Button>Edit</Button></Link>
            <Button variant="danger" size="sm" className="m-2"><Trash /></Button>
          </Col>
        </Row>
      </Card.Header>
    </Card.Body>
  </Card>
);

LostObjectItemDep.propTypes = {
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

export default LostObjectItemDep;
