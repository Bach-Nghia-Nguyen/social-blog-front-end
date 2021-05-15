import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { blogActions, routeActions } from "../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BlogEditorPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    images: [],
  });
  const loading = useSelector((state) => state.blog.loading);
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const selectedBlog = useSelector((state) => state.blog.selectedBlog);
  const redirectTo = useSelector((state) => state.route.redirectTo);
  const addOrEdit = params.id ? "Edit" : "Add";
  const blogId = params.id;

  useEffect(() => {
    if (blogId && addOrEdit === "Edit") {
      if (!selectedBlog) {
        dispatch(blogActions.getSingleBlog(blogId));
      }

      if (selectedBlog && selectedBlog._id !== blogId) {
        dispatch(blogActions.getSingleBlog(blogId));
      }

      if (selectedBlog && selectedBlog._id === blogId) {
        console.log("blogId is: ", blogId);
        console.log("selectedBlog is: ", selectedBlog);
        setFormData((formData) => ({
          ...formData,
          title: selectedBlog.title,
          content: selectedBlog.content,
          images: selectedBlog.images,
        }));
      }
    }
  }, [blogId, addOrEdit, selectedBlog]);

  const handleChange = (e) => {
    if (e.target.name === "images") {
      console.log("e.target.files is ", e.target.files);
      setFormData({ ...formData, images: e.target.files });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const uploadWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
        upload_preset: process.env.REACT_APP_CLOUDINARY_PRESET,
        tags: ["socialBlog", "blogImages"],
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
            images: result.data.info.files.map(
              (res) => res.uploadInfo.secure_url
            ),
          });
          console.log("Results in images: ", result.data);
        }
        if (error) {
          console.log("Errors in images: ", error);
        }
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, content, images } = formData;
    console.log("formData is : ", formData);
    if (addOrEdit === "Add") {
      dispatch(blogActions.createBlog(title, content, images));
    } else if (addOrEdit === "Edit") {
      dispatch(
        blogActions.updateBlog(selectedBlog._id, title, content, images)
      );
    }
  };

  const handleCancel = () => {
    history.goBack();
  };

  const handleDelete = () => {
    // TODO : popup confirmation modal
    dispatch(blogActions.deleteBlog(selectedBlog._id));
  };

  useEffect(() => {
    if (redirectTo) {
      if (redirectTo === "__GO_BACK__") {
        history.goBack();
        dispatch(routeActions.removeRedirectTo());
      } else {
        history.push(redirectTo);
        dispatch(routeActions.removeRedirectTo());
      }
    }
  }, [dispatch, redirectTo, history]);

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit}>
            <div className="text-center mb-3">
              <h1 className="text-primary">{addOrEdit} blog</h1>
              <p className="lead">
                <i className="fas fa-user" />
              </p>
            </div>
            <Form.Group>
              <Form.Control
                type="text"
                required
                placeholder="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                as="textarea"
                rows="10"
                placeholder="Content"
                name="content"
                value={formData.content}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              {formData.images &&
                formData.images.length > 0 &&
                formData.images.map((image) => (
                  <img
                    src={image}
                    key={image}
                    width="120px"
                    alt="blog images"
                  ></img>
                ))}
              <Button variant="info" onClick={uploadWidget}>
                <FontAwesomeIcon icon="image" size="1x" /> {addOrEdit} Image
              </Button>
            </Form.Group>
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
              <Button variant="light" onClick={handleCancel} disabled={loading}>
                Cancel
              </Button>
            </ButtonGroup>
            {addOrEdit === "Edit" && (
              <ButtonGroup className="d-flex">
                <Button
                  variant="danger"
                  onClick={handleDelete}
                  disabled={loading}
                >
                  Delete Blog
                </Button>
              </ButtonGroup>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default BlogEditorPage;
