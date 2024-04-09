import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import LostObjectItem from '../components/LostObjectItem';
// eslint-disable-next-line import/named
import { ObjectItems } from '../../api/object/ObjectItems';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const LostItems = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, lostItem } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(ObjectItems.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const lostItems = ObjectItems.collection.find({}).fetch();
    return {
      lostItem: lostItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>Lost Items</h2>
          </Col>
          <Row xs={1} md={2} ld={3} className="g-4">
            {lostItem.map((lostObject) => (<Col key={lostObject._id}><LostObjectItem lostObject={lostObject} /></Col>))}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default LostItems;
