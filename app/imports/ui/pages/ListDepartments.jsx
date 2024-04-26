import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import DepartmentItem from '../components/DepartmentItem';

const ListDepartments = () => {
  const { ready, departments } = useTracker(() => {
    const subscription = Meteor.subscribe('listDepartments');
    const rdy = subscription.ready();
    const departmentsItems = Meteor.users.find({}).fetch();
    return {
      departments: departmentsItems,
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
              <h2 style={{ color: 'white' }}>Departments</h2>
            </Col>
            <Row xs={1} md={2} lg={3} className="g-3">
              {departments.map((department) => (
                <Col sm={12} md={6} lg={4}>
                  <DepartmentItem key={department._id} department={department} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  ) : <LoadingSpinner />);
};

export default ListDepartments;
