import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const ReviewForm = ({
  reviewText,
  user,
  handleInputChange,
  handleSubmitReview,
  loading,
}) => {
  return (
    <Form onSubmit={handleSubmitReview}>
      <Form.Group as={Row}>
        <Form.Label htmlFor="review" column sm="2">
          @{user.name} Write a review:
        </Form.Label>
        <Col sm="8">
          <Form.Control
            id="review"
            type="text"
            value={reviewText}
            onChange={handleInputChange}
          />
        </Col>
        <Col sm="2">
          {loading ? (
            <Button variant="primary" type="button" disabled>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Submitting...
            </Button>
          ) : (
            <Button type="submit" disabled={!reviewText}>
              Submit
            </Button>
          )}
        </Col>
      </Form.Group>
    </Form>
  );
};

export default ReviewForm;
