import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { reactionActions } from "../redux/actions";

const ReactionEmoji = ({ reactionsData, targetType, targetId, size }) => {
  const loading = useSelector((state) => state.blog.submitLoading);
  const dispatch = useDispatch();

  const handleClick = (emoji) => {
    dispatch(reactionActions.sendReaction(targetType, targetId, emoji));
  };

  return (
    <ul className="emoji-list">
      <li>
        <button onClick={() => handleClick("like")} disabled={loading}>
          <FontAwesomeIcon icon="thumbs-up" size={size} color="navy" />
        </button>{" "}
        {reactionsData.like}
      </li>
      <li>
        <button onClick={() => handleClick("love")} disabled={loading}>
          <FontAwesomeIcon icon="heart" size={size} color="firebrick" />
        </button>{" "}
        {reactionsData.love}
      </li>
      <li>
        <button onClick={() => handleClick("laugh")} disabled={loading}>
          <FontAwesomeIcon icon="laugh" size={size} color="green" />
        </button>{" "}
        {reactionsData.laugh}
      </li>
      <li>
        <button onClick={() => handleClick("sad")} disabled={loading}>
          <FontAwesomeIcon icon="sad-cry" size={size} color="purple" />
        </button>{" "}
        {reactionsData.sad}
      </li>
      <li>
        <button onClick={() => handleClick("angry")} disabled={loading}>
          <FontAwesomeIcon icon="angry" size={size} color="orange" />
        </button>{" "}
        {reactionsData.angry}
      </li>
    </ul>
  );
};

export default ReactionEmoji;
