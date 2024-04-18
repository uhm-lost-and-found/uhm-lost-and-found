import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { LostObjects } from '../../api/lostobject/LostObject';
import LostObjectItemDep from '../components/LostObjectItemDep';

/* Renders a table containing all of the object documents. Use <ObjectItem> to render each row. */
const ListLostObjectsDep = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, lostObjects } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Objects documents.
    const subscription = Meteor.subscribe(LostObjects.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the objetItems documents
    const lostObjectItems = LostObjects.collection.find({}).fetch();
    return {
      lostObjects: lostObjectItems,
      ready: rdy,
    };
  }, []);

  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>Lost Items (Department)</h2>
          </Col>
          <Row xs={1} md={2} lg={3} className="g-3">
            {lostObjects.map((lostObject) => (
              <Col key={lostObject._id}>
                <LostObjectItemDep lostObject={lostObject} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListLostObjectsDep;
