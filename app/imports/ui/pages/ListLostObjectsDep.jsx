import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Image } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { LostObjects } from '../../api/lostobject/LostObject';
import LostObjectItemDep from '../components/LostObjectItemDep';

/* Renders a table containing all of the object documents. Use <ObjectItem> to render each row. */
const ListLostObjectsDep = () => {
  // Get the signed-in user's name
  const userName = Meteor.user() ? Meteor.user().username : '';
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, lostObjects } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Objects documents.
    const subscription = Meteor.subscribe(LostObjects.departmentPublicationName);
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
              <h1 style={{ fontSize: '150px', fontWeight: 600 }}>Edit Items</h1>
            </Col>
          </Row>
        </Container>
      </div>
      <Container className="py-3" style={{ minHeight: '100vh' }}>
        <Row className="justify-content-center">
          <Col>
            <Col className="text-center">
              <h2 style={{ color: 'white' }}>Lost Items ({userName})</h2>
            </Col>
            <Row xs={1} md={2} lg={3} className="g-3">
              {lostObjects.map((lostObject) => (
                <Col sm={12} md={6} lg={3} key={lostObject._id} className="my-2" data-aos="fade-up" data-aos-duration="2000" data-aos-once="true">
                  <LostObjectItemDep lostObject={lostObject} collection={LostObjects.collection} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  ) : <LoadingSpinner />);
};

export default ListLostObjectsDep;
