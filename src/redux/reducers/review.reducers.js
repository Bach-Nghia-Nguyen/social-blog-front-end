import * as types from "../constants/review.constants";

const initialState = {
  reviews: [],
  submitLoading: false,
  selectedBlog: null,
};

const reviewReducers = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    /**
     * Create new review of a blog
     */
    case types.CREATE_REVIEW_REQUEST:
      return { ...state, submitLoading: true };
    case types.CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        submitLoading: false,
        selectedBlog: {
          ...state.selectedBlog,
          reviews: [...state.selectedBlog.reviews, payload],
        },
      };
    case types.CREATE_REVIEW_FAILURE:
      return { ...state, submitLoading: false };

    default:
      return state;
  }
};

export default reviewReducers;
