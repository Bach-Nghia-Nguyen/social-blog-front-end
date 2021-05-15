import * as reviewTypes from "../constants/review.constants";
import api from "../../apiService";

const createReview = (blogId, reviewText) => async (dispatch) => {
  dispatch({ type: reviewTypes.CREATE_REVIEW_REQUEST, payload: null });
  try {
    const res = await api.post(`/reviews/blogs/${blogId}`, {
      content: reviewText,
    });

    dispatch({
      type: reviewTypes.CREATE_REVIEW_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: reviewTypes.CREATE_REVIEW_FAILURE, payload: error });
  }
};

export const reviewActions = { createReview };
