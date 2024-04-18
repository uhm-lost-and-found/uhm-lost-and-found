import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import LostObjectItemAdmin from '../components/LostObjectItemAdmin';
import { LostObjects } from '../../api/lostobject/LostObject';

const ListLostObjectsAdmin = () => {
  const { ready, lostObjects } = useTracker(() => {
    const subscription = Meteor.subscribe(LostObjects.adminPublicationName);
    const rdy = subscription.ready();
    const lostObjectItems = LostObjects.collection.find({}).fetch();
    return {
      lostObjects: lostObjectItems,
      ready: rdy,
    };
  }, []);

  return (ready ? (
    <div style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh' }}>
      <img
        src="https://manoa.hawaii.edu/library/wp-content/uploads/2017/10/Sunny-Alcove.jpg"
        alt="Background"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'brightness(0.6)',
          position: 'fixed',
          zIndex: -1,
          top: 0,
          left: 0,
        }}
      />
      <Container className="py-3">
        <Row className="justify-content-center">
          <Col>
            <Col className="text-center">
              <h2 style={{ color: 'white' }}>Lost Items (Admin)</h2>
            </Col>
            <Row xs={1} md={2} lg={3} className="g-3">
              {lostObjects.map((lostObject) => (
                <Col key={lostObject._id}>
                  <LostObjectItemAdmin lostObject={lostObject} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  ) : <LoadingSpinner />);
};

export default ListLostObjectsAdmin;
