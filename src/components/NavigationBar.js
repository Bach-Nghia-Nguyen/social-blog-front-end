import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../images/logo.svg";
import { authActions } from "../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavigationBar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  const authLinks = (
    <Nav>
      <Nav.Link as={Link} to="/member/profile">
        <FontAwesomeIcon icon="chart-line" size="sm" /> Dashboard
      </Nav.Link>
      <Nav.Link onClick={handleLogout}>
        <FontAwesomeIcon icon="sign-out-alt" size="sm" />
        Logout
      </Nav.Link>
    </Nav>
  );

  const publicLinks = (
    <Nav>
      <Nav.Link as={Link} to="/register">
        <FontAwesomeIcon icon="registered" size="sm" /> Register
      </Nav.Link>
      <Nav.Link as={Link} to="/login">
        <FontAwesomeIcon icon="sign-in-alt" size="sm" /> Login
      </Nav.Link>
    </Nav>
  );

  return (
    <Navbar bg="secondary" expand="lg">
      <Navbar.Brand as={Link} to="/" className="mr-auto">
        <img src={logo} alt="CoderSchool" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto"></Nav>
        {!loading && <>{isAuthenticated ? authLinks : publicLinks}</>}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
