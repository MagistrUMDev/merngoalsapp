import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGoal } from "../features/goals/goalSlice";
import { updateGoal } from "../features/goals/goalSlice";
import { toast } from "react-toastify";

function GoalForm() {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const { isUpdating, id } = useSelector((state) => state.goals);
  const onSubmit = (e) => {
    e.preventDefault();
    if (isUpdating) {
      if (/\S/.test(text)) {
        dispatch(updateGoal({ text }));
        window.location.reload();
      } else {
        toast.warning("Field must be non-empty!");
      }
    } else {
      if (/\S/.test(text)) {
        dispatch(createGoal({ text }));
      } else {
        toast.warning("Field must be non-empty!");
      }
    }
    setText("");
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="form-group">
          {isUpdating ? (
            <button className="btn btn-block-update" type="submit">
              Update Goal
            </button>
          ) : (
            <button className="btn btn-block" type="submit">
              Add Goal
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
export default GoalForm;
