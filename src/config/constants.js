export const FB_APP_ID = "";

export const GOOGLE_CLIENT_ID = "";

export const friendListTabNames = {
  FRIENDS: "FRIEND_LIST.TAB_KEY.FRIENDS",
  ALL_USERS: "FRIEND_LIST.TAB_KEY.ALL_USERS",
  SENT_REQUESTS: "FRIEND_LIST.TAB_KEY.SENT_REQUESTS",
  RECEIVED_REQUEST: "FRIEND_LIST.TAB_KEY.RECEIVED_REQUEST",
};

export const actionTypes = {
  ADD_FRIEND: "FRIEND_LIST.ACTION_TYPE.ADD_FRIEND",
  REMOVE_FRIEND: "FRIEND_LIST.ACTION_TYPE.REMOVE_FRIEND",
  DECLINE_REQUEST: "FRIEND_LIST.ACTION_TYPE.DECLINE_REQUEST",
  ACCEPT_REQUEST: "FRIEND_LIST.ACTION_TYPE.ACCEPT_REQUEST",
  CANCEL_REQUEST: "FRIEND_LIST.ACTION_TYPE.CANCEL_REQUEST",
};

export const conversationTypes = {
  GLOBAL: "CONVERSATION_TYPE.GLOBAL",
  PRIVATE: "CONVERSATION_TYPE.PRIVATE",
};

export const messengerTabNames = {
  CONVERSATIONS: "MESSENGER.TAB_KEY.CONVERSATIONS",
  FRIENDS: "MESSENGER.TAB_KEY.FRIENDS",
};

export const socketTypes = {
  NOTIFICATION: "NOTIFICATION",
  GLOBAL_MSG_INIT: "GLOBAL_MESSAGE_INIT",
  GLOBAL_MSG_SEND: "GLOBAL_MSG_SEND",
  GLOBAL_MSG_RECEIVE: "GLOBAL_MSG_RECEIVE",
  PRIVATE_MSG_INIT: "PRIVATE_MSG_INIT",
  PRIVATE_MSG_SEND: "PRIVATE_MSG_SEND",
  PRIVATE_MSG_RECEIVE: "PRIVATE_MSG_RECEIVE",
  ERROR: "ERROR",
};
