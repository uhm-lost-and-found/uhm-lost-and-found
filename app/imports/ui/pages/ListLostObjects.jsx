import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Image } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import LostObjectItem from '../components/LostObjectItem';
import { LostObjects } from '../../api/lostobject/LostObject';
/* Renders a table containing all of the object documents. Use <ObjectItem> to render each row. */
const ListLostObjects = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, lostObjects } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Objects documents.
    const subscription = Meteor.subscribe('allAccess');
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
              <h1 style={{ fontSize: '150px', fontWeight: 600 }}>Lost Items</h1>
            </Col>
          </Row>
        </Container>
      </div>
      <Container
        style={{
          minHeight: '100vh',
        }}
      >
        <Row className="justify-content-center">
          <Col>
            <Row xs={1} md={2} lg={3} className="g-3 mt-5">
              {lostObjects.map((lostObject) => (
                <Col sm={6} md={4} lg={3} key={lostObject._id} data-aos="fade-up" data-aos-duration="2000">
                  <LostObjectItem lostObject={lostObject} collection={LostObjects.collection} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  ) : <LoadingSpinner />);
};

export default ListLostObjects;
