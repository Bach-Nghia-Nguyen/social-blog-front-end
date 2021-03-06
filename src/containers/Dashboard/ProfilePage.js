import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Row,
  Form,
  ButtonGroup,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { authActions } from "../../redux/actions";
import { ClipLoader } from "react-spinners";

const ProfilePage = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    avatarUrl: currentUser.avatarUrl,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, avatarUrl } = formData;
    dispatch(authActions.updateUserProfile(name, avatarUrl));
    setEditable(false);
  };

  const handleCancel = () => {
    setEditable(false);
  };

  const uploadWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
        upload_preset: process.env.REACT_APP_CLOUDINARY_PRESET,
        tags: ["socialBlog", "userAvatar"],
      },
      function (error, result) {
        if (
          result.data &&
          result.data.info &&
          result.data.info.files &&
          result.data.info.files.length
        ) {
          setFormData({
            ...formData,
            avatarUrl: result.data.info.files[0].uploadInfo.secure_url,
          });
        }
        if (error) {
          console.log("Errors in images: ", error);
        }
      }
    );
  };

  return (
    <Container fluid>
      <br />
      <Row>
        <Col>
          <h4>Profile Page</h4>
        </Col>
        <Col className="d-flex justify-content-end align-items-start">
          <Button variant="primary" onClick={() => setEditable(true)}>
            <FontAwesomeIcon icon="edit" size="1x" /> Edit
          </Button>
        </Col>
      </Row>
      <br />

      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          {loading ? (
            <div className="d-flex justify-content-center align-items-center">
              <ClipLoader color="#f86c6b" size={150} loading={true} />
            </div>
          ) : (
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <div className="text-center">
                  {formData.avatarUrl && (
                    <div className="mb-3">
                      <img
                        src={formData.avatarUrl}
                        className="avatar-lg"
                        alt="avatar"
                      />
                    </div>
                  )}
                  <Button
                    variant="info"
                    // className="btn-block w-50 "
                    onClick={uploadWidget}
                    disabled={!editable}
                  >
                    <FontAwesomeIcon icon="image" size="1x" /> Edit avatar
                  </Button>
                </div>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="2">
                  Name
                </Form.Label>
                <Col>
                  <Form.Control
                    type="text"
                    required
                    placeholder="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!editable}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="2">
                  Email
                </Form.Label>
                <Col>
                  <Form.Control
                    type="email"
                    required
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    disabled={true}
                  />
                </Col>
              </Form.Group>
              <br />
              {editable && (
                <ButtonGroup className="d-flex mb-3">
                  {loading ? (
                    <Button
                      className="mr-3"
                      variant="primary"
                      type="button"
                      disabled
                    >
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Submitting...
                    </Button>
                  ) : (
                    <Button className="mr-3" type="submit" variant="primary">
                      <FontAwesomeIcon icon="upload" size="1x" /> Submit
                    </Button>
                  )}
                  <Button
                    variant="light"
                    onClick={handleCancel}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                </ButtonGroup>
              )}
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
