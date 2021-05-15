import React from "react";
import { Route, Switch } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import NotFoundPage from "../NotFoundPage";

import ProfilePage from "../Dashboard/ProfilePage";
import SideMenu from "../../components/SideMenu";
import FriendListPage from "../Dashboard/FriendListPage";
import BlogEditorPage from "../BlogEditorPage";
import BlogListPage from "../Dashboard/BlogListPage";
import BlogDetailPage from "../BlogDetailPage";

const MemberLayout = () => {
  return (
    <Container fluid>
      <Row>
        <SideMenu />
        <Col md={9} lg={10}>
          <Switch>
            <Route exact path="/member/profile" component={ProfilePage} />
            <Route exact path="/member/friends" component={FriendListPage} />
            <Route exact path="/member/blogs" component={BlogListPage} />
            <Route exact path="/member/blogs/:id" component={BlogDetailPage} />
            <Route exact path="/member/blog/add" component={BlogEditorPage} />
            <Route
              exact
              path="/member/blog/edit/:id"
              component={BlogEditorPage}
            />
            {/* <Route exact path="/member/messenger" component={MessengerPage} /> */}
            <Route component={NotFoundPage} />
          </Switch>
        </Col>
      </Row>
    </Container>
  );
};

export default MemberLayout;
