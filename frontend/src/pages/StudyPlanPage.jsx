import { useLocation, useNavigate } from "react-router-dom";
import StudyStep from "../components/StudyStep";

function StudyPlanPage() {

  const location = useLocation();
  const navigate = useNavigate();

  const plan = location.state?.plan;
  const subject = location.state?.subject;

  if (!plan) {
    return <h1>No study plan found.</h1>;
  }

  return (
    <div className="study-plan-page"> 
      <button onClick={() => navigate("/")}>
        Back to Home
      </button>
      <h1>Your Study Plan</h1>
      <h2>{subject}</h2>
      <div className="study-steps">
        {plan.map((step, index) => (
          <StudyStep
            key={index}
            task={step.task}
            duration={step.duration}
          />
        ))}
      </div>
    </div>
  );
}

export default StudyPlanPage