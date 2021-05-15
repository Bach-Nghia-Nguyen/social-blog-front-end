import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SideMenu = () => {
  return (
    <Nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div className="sidebar-sticky pt-3">
        <Nav.Item>
          <Nav.Link
            as={NavLink}
            to="/member/profile"
            activeClassName="active"
            strict={true}
          >
            <FontAwesomeIcon icon="user-circle" size="1x" /> Profile
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            as={NavLink}
            to="/member/blogs"
            activeClassName="active"
            strict={true}
          >
            <FontAwesomeIcon icon="blog" size="1x" /> Blogs
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            as={NavLink}
            to="/member/friends"
            activeClassName="active"
            strict={true}
          >
            <FontAwesomeIcon icon="users" size="1x" /> Friends
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            as={NavLink}
            to="/member/messenger"
            activeClassName="active"
            strict={true}
          >
            <FontAwesomeIcon icon="comments" size="1x" /> Messenger
          </Nav.Link>
        </Nav.Item>
      </div>
    </Nav>
  );
};

export default SideMenu;
