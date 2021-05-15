import React from "react";
import Moment from "react-moment";
import ReactionEmoji from "./ReactionEmoji";

const ReviewContent = ({ review }) => {
  return (
    <div className="review">
      <span className="review_body">{review.content}</span>
      <br />
      <span className="review_by">posted by </span>
      <span className="review_author">{review.user.name}</span>
      <span className="review_on"> on </span>
      <span className="review_date">
        <Moment fromNow>{review.createdAt}</Moment>
      </span>

      <ReactionEmoji
        reactionsData={review.reactions}
        targetType="Review"
        targetId={review._id}
        size="1x"
      />
    </div>
  );
};

const ReviewList = ({ reviews }) => {
  return (
    <>
      <h4>Reviews:</h4>
      {reviews && reviews.length > 0 ? (
        <ul className="list-unstyled">
          {reviews.map((review) => (
            <ReviewContent review={review} key={review._id} />
          ))}
        </ul>
      ) : (
        <p>There is no review</p>
      )}
    </>
  );
};

export default ReviewList;
