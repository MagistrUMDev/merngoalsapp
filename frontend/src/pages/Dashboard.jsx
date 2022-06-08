import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import GoalForm from "../components/GoalForm";
import Spinner from "../components/Spinner";
import CancelUpdatingButton from "../components/CancelUpdatingButton";
import { getGoals, reset } from "../features/goals/goalSlice";
import GoalItem from "../components/GoalItem";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message, isUpdating } = useSelector(
    (state) => state.goals
  );

  useEffect(
    (e) => {
      if (!user) {
        navigate("/login");
      }

      return () => {
        dispatch(reset());
      };
    },
    [user, navigate, isError, message]
  );
  useEffect(() => {
    dispatch(getGoals());

  
    return () => dispatch(reset());
  }, [dispatch]);
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome, {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>

      <GoalForm />

      <section className="content">
        {isUpdating ? (
          <CancelUpdatingButton />
        ) : null}
        {goals.length > 0 && !isUpdating ? (
          <div className="goals">
            {goals.map((goal) => (
              <GoalItem value={goal._id} goal={goal} key={goal._id} />
            ))}
          </div>
        ) : (
          !isUpdating ?
          <h3>You have not set any goals</h3> : null
        )}
      </section>
    </>
  );
}

export default Dashboard;
