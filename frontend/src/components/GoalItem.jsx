import { useDispatch, useSelector } from "react-redux";
import { deleteGoal } from "../features/goals/goalSlice";
import { FaEdit } from "react-icons/fa";
import { updateId } from "../features/goals/goalSlice";
import { update } from "../features/goals/goalSlice";

import React from "react";

function GoalItem({ goal }) {
  const dispatch = useDispatch();
  const { isUpdating } = useSelector((state) => state.goals);
  return (
    <div
      className={isUpdating ? "goal updating" : "goal"}
      onClick={(e) => {
        if (isUpdating) {
          dispatch(update());
          dispatch(updateId(""));
        }
      }}
    >
      {isUpdating ? (
        <>
          <div className="form updating-block">
            <button className="form-button-updating">Cancel Updating</button>
          </div>
        </>
      ) : (
        <>
          <div>{new Date(goal.createdAt).toLocaleString("en-US")}</div>
          <h2>{goal.text}</h2>
          <div className="goal-buttons">
            <button
              onClick={() => dispatch(deleteGoal(goal._id))}
              className="close"
            >
              X
            </button>
            <button
              onClick={(e) => {
                dispatch(update());
                dispatch(updateId(goal._id));
              }}
              className="edit"
            >
              <FaEdit />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default GoalItem;
