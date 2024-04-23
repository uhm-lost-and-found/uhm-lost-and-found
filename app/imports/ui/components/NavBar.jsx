import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Nav, Navbar, Image } from 'react-bootstrap';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  return (
    <Navbar expand="lg">
      <Container className="">
        <Navbar.Brand as={NavLink} to="/" className="mx-auto">
          <Image src="https://manoa.hawaii.edu/wp/wp-content/uploads/2017/10/uhm-white-seal-nameplate@2x.png" width="203" />
          {/* <h4>LOST AND FOUND</h4> */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav ">
          <div className="flex-grow-1 pe-3">
            <Nav className="mx-auto justify-content-center">
              <Nav.Link className="mx-lg-2" id="your-item-id" as={NavLink} to="/" key="home">
                HOME
              </Nav.Link>
              <Nav.Link className="mx-lg-2" id="list-stuff-nav" as={NavLink} to="/list" key="list">
                LOST ITEMS
              </Nav.Link>
              {currentUser ? ([
                <Nav.Link id="add-stuff-nav" as={NavLink} to="/add" key="add">ADD ITEM</Nav.Link>,
              ]) : ''}
              {Roles.userIsInRole(Meteor.userId(), 'department') && (
                <Nav.Link id="list-stuff-nav" as={NavLink} to="/listDep" key="list">EDIT ITEM</Nav.Link>
              )}
              {Roles.userIsInRole(Meteor.userId(), 'admin') && (
                <>
                  <Nav.Link id="list-stuff-nav" as={NavLink} to="/admin" key="list">EDIT ITEM</Nav.Link>
                  <Nav.Link className="mx-lg-2" id="list-stuff-nav" as={NavLink} to="/departments" key="departments">DEPARTMENTS</Nav.Link>
                  <Nav.Link className="mx-lg-2" id="add-stuff-nav" as={NavLink} to="/add-department" key="add-department">ADD DEPARTMENT</Nav.Link>
                </>
              )}
            </Nav>
          </div>
          <Nav className="justify-content-end">
            {currentUser === '' ? (
              <a href="/signin" className="action-btn">SIGN IN</a>
            ) : (
              <a href="/signout" className="action-btn">SIGN OUT</a>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
