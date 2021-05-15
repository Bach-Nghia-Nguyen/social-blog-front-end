import * as types from "../constants/blog.constants";
import * as reviewTypes from "../constants/review.constants";
import * as reactionTypes from "../constants/reaction.constants";

const initialState = {
  blogs: [],
  totalPageNum: 1,
  loading: false,
  submitLoading: false,
  selectedBlog: null,
};

const blogReducers = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    /**
     * Get blogs
     */
    case types.GET_BLOGS_REQUEST:
      return { ...state, loading: true };
    case types.GET_BLOGS_SUCCESS:
      return {
        ...state,
        blogs: payload.blogs,
        totalPageNum: payload.totalPages,
        loading: false,
      };
    case types.GET_BLOGS_FAILURE:
      console.log(payload);
      return { ...state, loading: false };

    /**
     * Get single blog
     */
    case types.GET_SINGLE_BLOG_REQUEST:
      return { ...state, loading: true };
    case types.GET_SINGLE_BLOG_SUCCESS:
      return { ...state, selectedBlog: payload, loading: false };
    case types.GET_SINGLE_BLOG_FAILURE:
      return { ...state, loading: false };

    /**
     * Create new review of a blog
     */
    case reviewTypes.CREATE_REVIEW_REQUEST:
      return { ...state, submitLoading: true };
    case reviewTypes.CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        submitLoading: false,
        selectedBlog: {
          ...state.selectedBlog,
          reviews: [...state.selectedBlog.reviews, payload],
        },
      };
    case reviewTypes.CREATE_REVIEW_FAILURE:
      return { ...state, submitLoading: false };

    /**
     * Create new blog
     */
    case types.CREATE_BLOG_REQUEST:
      return { ...state, loading: true };
    case types.CREATE_BLOG_SUCCESS:
      return { ...state, loading: false };
    case types.CREATE_BLOG_FAILURE:
      return { ...state, loading: false };

    /**
     * Update blog
     */
    case types.UPDATE_BLOG_REQUEST:
      return { ...state, loading: true };
    case types.UPDATE_BLOG_SUCCESS:
      return {
        ...state,
        selectedBlog: payload,
        loading: false,
      };
    case types.UPDATE_BLOG_FAILURE:
      return { ...state, loading: false };

    /**
     * Delete blog
     */
    case types.DELETE_BLOG_REQUEST:
      return { ...state, loading: true };
    case types.DELETE_BLOG_SUCCESS:
      return { ...state, loading: false, selectedBlog: {} };
    case types.DELETE_BLOG_FAILURE:
      return { ...state, loading: false };

    /**
     * Send Reaction to Blog or Review
     */
    case reactionTypes.SEND_REACTION_REQUEST:
      return { ...state, submitLoading: true };
    case reactionTypes.BLOG_REACTION_SUCCESS:
      return {
        ...state,
        selectedBlog: { ...state.selectedBlog, reactions: payload },
        submitLoading: false,
      };
    case reactionTypes.REVIEW_REACTION_SUCCESS:
      return {
        ...state,
        selectedBlog: {
          ...state.selectedBlog,
          reviews: [
            ...state.selectedBlog.reviews.map((review) => {
              if (review._id !== payload.reviewId) return review;
              return { ...review, reactions: payload.reactions };
            }),
          ],
        },
        submitLoading: false,
      };
    case reactionTypes.SEND_REACTION_FAILURE:
      return { ...state, submitLoading: false };

    default:
      return state;
  }
};

export default blogReducers;
