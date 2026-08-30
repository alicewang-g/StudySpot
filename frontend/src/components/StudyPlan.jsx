import StudyStep from "./StudyStep";
function StudyPlan({ subject, plan }) {
  if (!plan) {
    return null;
  }

  return (
    <div className="study-plan">
      <h2>Your {subject} Study Plan</h2>

      {plan.map((step, index) => ( //arrow essentially defines a function without giving it a name
                                // this is literally function smthRand (step,index) {}
        <StudyStep
          key={index} // this is notifier of map key to find duration and task
          duration={step.duration}
          task={step.task}
        />
      ))}
    </div>
  );
}

export default StudyPlan