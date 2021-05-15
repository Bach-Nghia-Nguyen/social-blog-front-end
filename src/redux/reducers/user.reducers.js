import * as types from "../constants/user.constants";
import { conversationTypes } from "../../config/constants";

const globalConversation = {
  _id: conversationTypes.GLOBAL,
  type: conversationTypes.GLOBAL,
};

const initialState = {
  users: [],
  conversations: [globalConversation],
  totalPageNum: 1,
  selectedUser: {},
  loading: false,
};

const userReducers = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    /**
     * Get users
     */
    case types.GET_USERS_REQUEST:
      return { ...state, loading: true };
    case types.GET_USERS_SUCCESS:
      return {
        ...state,
        users: payload.users,
        totalPageNum: payload.totalPages,
        loading: false,
      };
    case types.GET_USERS_FAILURE:
      return { ...state, loading: false };

    /**
     * Get friends
     */
    case types.GET_FRIENDS_REQUEST:
      return { ...state, loading: true };
    case types.GET_FRIENDS_SUCCESS:
      return {
        ...state,
        users: payload.users,
        totalPageNum: payload.totalPages,
        loading: false,
      };
    case types.GET_FRIENDS_FAILURE:
      return { ...state, loading: false };

    /**
     * Get sent friend requrest
     */
    case types.GET_SENT_REQUEST:
      return { ...state, loading: true };
    case types.GET_SENT_SUCCESS:
      return {
        ...state,
        users: payload.users,
        totalPageNum: payload.totalPages,
        loading: false,
      };
    case types.GET_SENT_FAILURE:
      return { ...state, loading: false };

    /**
     * Get received friend request
     */
    case types.GET_RECEIVED_REQUEST:
      return { ...state, loading: true };
    case types.GET_RECEIVED_SUCCESS:
      return {
        ...state,
        users: payload.users,
        totalPageNum: payload.totalPages,
        loading: false,
      };
    case types.GET_RECEIVED_FAILURE:
      return { ...state, loading: false };

    /**
     * Get conversations
     */
    case types.GET_CONVERSATIONS_REQUEST:
      return { ...state, loading: true };
    case types.GET_CONVERSATIONS_SUCCESS:
      return {
        ...state,
        conversations: [globalConversation, ...payload.conversations],
        totalPageNum: payload.totalPages,
        loading: false,
      };
    case types.GET_CONVERSATIONS_FAILURE:
      return { ...state, loading: false };

    /**
     * Add friend
     */
    case types.ADD_FRIEND_REQUEST:
      return { ...state, loading: true };
    case types.ADD_FRIEND_SUCCESS:
      return {
        ...state,
        loading: false,
        users: [
          ...state.users.map((user) => {
            if (user._id !== payload.targetId) return user;
            return {
              ...user,
              friendship: { ...user.friendship, status: "requesting" },
            };
          }),
        ],
      };
    case types.ADD_FRIEND_FAILURE:
      return { ...state, loading: false };

    /**
     * Remove friend
     */
    case types.REMOVE_FRIEND_REQUEST:
      return { ...state, loading: true };
    case types.REMOVE_FRIEND_SUCCESS:
      return {
        ...state,
        loading: false,
        users: [...state.users.filter((user) => user._id !== payload.targetId)],
      };
    case types.REMOVE_FRIEND_FAILURE:
      return { ...state, loading: false };

    /**
     * Decline friend request
     */
    case types.DECLINE_REQUEST_REQUEST:
      return { ...state, loading: true };
    case types.DECLINE_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        users: [...state.users.filter((user) => user._id !== payload.targetId)],
      };
    case types.DECLINE_REQUEST_FAILURE:
      return { ...state, loading: false };

    /**
     * Accept friend request
     */
    case types.ACCEPT_REQUEST_REQUEST:
      return { ...state, loading: true };
    case types.ACCEPT_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        users: [...state.users.filter((user) => user._id !== payload.targetId)],
      };
    case types.ACCEPT_REQUEST_FAILURE:
      return { ...state, loading: false };

    /**
     * Cancel friend request
     */
    case types.CANCEL_REQUEST_REQUEST:
      return { ...state, loading: true };
    case types.CANCEL_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        users: [...state.users.filter((user) => user._id !== payload.targetId)],
      };
    case types.CANCEL_REQUEST_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default userReducers;
