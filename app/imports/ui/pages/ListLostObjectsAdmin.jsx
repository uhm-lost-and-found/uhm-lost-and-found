import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Image } from 'react-bootstrap';
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
    <>
      <div className="div position-relative pb-5 text-white border-bottom shadow">
        <Image
          className="img-fluid"
          src="https://manoa.hawaii.edu/library/wp-content/uploads/2017/10/Sunny-Alcove.jpg"
          alt="Banner"
          style={{
            width: '100vw',
            maxHeight: '100%',
            minHeight: '100%',
            filter: 'brightness(0.5)',
            position: 'absolute',
            zIndex: -1,
            objectFit: 'cover',
          }}
        />
        <Container id="landing-page" data-aos="fade-up" data-aos-duration="2000">
          <Row className="align-middle text-center mt-5">
            <Col>
              <h1 style={{ fontSize: '150px', fontWeight: 600 }}>Edit Items</h1>
            </Col>
          </Row>
        </Container>
      </div>
      <Container style={{ minHeight: '100vh' }}>
        <Row className="justify-content-center">
          <Col>
            <Row xs={1} md={2} lg={3} className="g-3 mt-5">
              {lostObjects.map((lostObject) => (
                <Col sm={12} md={4} lg={3} key={lostObject._id} data-aos="fade-up" data-aos-duration="2000" data-aos-once="true">
                  <LostObjectItemAdmin lostObject={lostObject} collection={LostObjects.collection} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  ) : <LoadingSpinner />);
};

export default ListLostObjectsAdmin;
