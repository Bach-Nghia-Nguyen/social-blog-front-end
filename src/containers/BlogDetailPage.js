import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { blogActions, reviewActions } from "../redux/actions";
import ReviewList from "../components/ReviewList";
import ReviewForm from "../components/ReviewForm";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactionEmoji from "../components/ReactionEmoji";

const BlogDetailPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const blog = useSelector((state) => state.blog.selectedBlog);
  const loading = useSelector((state) => state.blog.loading);
  const submitLoading = useSelector((state) => state.blog.submitLoading);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const currentUser = useSelector((state) => state.auth.user);
  const history = useHistory();

  const [reviewText, setReviewText] = useState("");

  const handleInputChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    dispatch(reviewActions.createReview(blog._id, reviewText));
    setReviewText("");
  };

  useEffect(() => {
    if (params.id) {
      dispatch(blogActions.getSingleBlog(params.id));
    }
  }, [dispatch, params]);

  const handleGoBackClick = (e) => {
    history.goBack();
  };

  return (
    <div className="blog-detail-page">
      <div className="d-flex justify-content-between ">
        <Button onClick={handleGoBackClick}>
          <FontAwesomeIcon icon="chevron-left" size="1x" /> Back
        </Button>

        {blog &&
        currentUser &&
        blog._id &&
        currentUser._id === blog.author._id ? (
          <Link to={`/blog/edit/${blog._id}`}>
            <Button variant="primary">
              <FontAwesomeIcon icon="edit" size="1x" /> Edit
            </Button>
          </Link>
        ) : (
          <></>
        )}
      </div>
      {loading ? (
        <ClipLoader color="#f86c6b" size={150} loading={loading} />
      ) : (
        <>
          {blog && (
            <div className="mb-5">
              <h3>{blog.title}</h3>

              <span className="text-muted">
                @{blog.author.name} wrote{" "}
                <Moment fromNow>{blog.createdAt}</Moment>
              </span>

              <hr />
              <p>{blog.content}</p>
              <hr />
              <ReactionEmoji
                reactionsData={blog.reactions}
                targetType="Blog"
                targetId={blog._id}
                size="2x"
              />
              <hr />

              <ReviewList reviews={blog.reviews} />
            </div>
          )}

          {isAuthenticated && (
            <ReviewForm
              reviewText={reviewText}
              user={currentUser}
              handleInputChange={handleInputChange}
              handleSubmitReview={handleSubmitReview}
              loading={submitLoading}
            />
          )}
        </>
      )}
    </div>
  );
};

export default BlogDetailPage;
