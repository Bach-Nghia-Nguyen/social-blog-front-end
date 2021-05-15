import * as reactionTypes from "../constants/reaction.constants";
import api from "../../apiService";

const sendReaction = (targetType, targetId, emoji) => async (dispatch) => {
  dispatch({ type: reactionTypes.SEND_REACTION_REQUEST, payload: null });
  try {
    const res = await api.post(`/reactions`, { targetType, targetId, emoji });
    if (targetType === "Blog") {
      dispatch({
        type: reactionTypes.BLOG_REACTION_SUCCESS,
        payload: res.data.data,
      });
    }
    if (targetType === "Review") {
      dispatch({
        type: reactionTypes.REVIEW_REACTION_SUCCESS,
        payload: { reactions: res.data.data, reviewId: targetId },
      });
    }
  } catch (error) {
    dispatch({ type: reactionTypes.SEND_REACTION_FAILURE, payload: error });
  }
};

export const reactionActions = {
  sendReaction,
};
