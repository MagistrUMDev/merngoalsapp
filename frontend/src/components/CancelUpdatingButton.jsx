import { useDispatch } from "react-redux";
import { update } from "../features/goals/goalSlice";

function CancelUpdatingButton() {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(update())
  }
  return (
    <div className="goal updating">
      <div className="form updating-block">
        <button className="form-button-updating" onClick={onClick}>
          Cancel Updating
        </button>
      </div>
    </div>
  );
}
export default CancelUpdatingButton;
