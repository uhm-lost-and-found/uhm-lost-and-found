import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import LostObjectItem from '../components/LostObjectItem';
// import { Objects } from '../../api/object/Objects';
import { Stuffs } from '../../api/stuff/Stuff';

/* Renders a table containing all of the object documents. Use <ObjectItem> to render each row. */
const LostItems = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Objects documents.
    const subscription = Meteor.subscribe(Stuffs.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the objetItems documents
    const stuffItems = Stuffs.collection.find({}).fetch();
    return {
      stuffs: stuffItems,
      ready: rdy,
    };
  }, []);

  const objects = [{
    name: 'Airpods', dateFound: '2011-10-10', locationFound: 'Paradise Palms', currentDepartment: 'POST', image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MV7N2?wid=1144&hei=1144&fmt=jpeg&qlt=95&.v=1551489688005', owner: 'admin@foo.com' },
  { name: 'Nike Shoes', dateFound: '2013-06-12', locationFound: 'Webster Hall', currentDepartment: 'Webster Hall', image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/e4060b19-289e-43b4-8375-c047c1cf6ab6/air-max-pulse-mens-shoes-DWTVpN.png', owner: 'admin@foo.com' },
  { name: 'Wallet', dateFound: '2016-12-02', locationFound: 'Shidler Hall', currentDepartment: 'Bookstore',
    image: 'https://cdn11.bigcommerce.com/s-z6agnrtx29/images/stencil/1280x1280/products/575/3025/rachel-cruze-cash-envelope-wallet-camel__50885__58968.1699630602.jpg?c=1', owner: 'admin@foo.com' },
  ];

  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>Lost Items</h2>
          </Col>
          <Row xs={1} md={2} lg={3} className="g-3">
            {objects.map((lostObject) => (<Col key={lostObject._id}><LostObjectItem lostObject={lostObject} /></Col>))}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default LostItems;
