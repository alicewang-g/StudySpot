import { useLocation, useNavigate } from "react-router-dom"; 
import { useState } from "react"; 
import StudyStep from "../components/StudyStep"; 
function StudyPlanPage() { 
  const location = useLocation(); 
  const navigate = useNavigate(); 
  const plan = location.state?.plan; 
  const subject = location.state?.subject; 
  // Which task is currently being focused on 
  const [activeStep, setActiveStep] = useState(null); 
  // How much time is left for each task 
  const [remainingTimes, setRemainingTimes] = useState(plan ? plan.map((step) => step.duration * 60) : [] ); 
  // Which tasks have actually been completed 
  const [completedSteps, setCompletedSteps] = useState([]); 
  if (!plan) { 
    return ( 
    <div> 
      <h1>No study plan found.</h1> 
      <button onClick={() => navigate("/")}> Back to Home 
        </button> 
    </div> ); } 
    // Called when the timer reaches zero 
    function completeStep(index) { 
      setCompletedSteps((previous) => { 
        if (previous.includes(index)) { 
          return previous; 
        } 
          return [...previous, index]; 
      }); 
    // Leave focus mode 
       setActiveStep(null); } 
  // Called when the user clicks Pause 
  function pauseStep() { // Simply leave focus mode. 
  // We DO NOT mark the task as complete. 
    setActiveStep(null); } 
  // If a task is currently active, show focus mode 
  if (activeStep !== null) { 
    return ( 
      <div className="focus-mode"> 
        <div className="focus-content"> 
          <p className="focus-label"> 
            STUDYING </p> 
          <h1> {plan[activeStep].task}
          </h1> 
          <StudyStep 
          task={plan[activeStep].task} 
          duration={plan[activeStep].duration} 
          secondsLeft={remainingTimes[activeStep]} 
          setSecondsLeft={(newTime) => { 
            setRemainingTimes((previous) => { 
              const updated = [...previous]; 
              updated[activeStep] = 
              typeof newTime === "function" 
              ? newTime(previous[activeStep]) 
              : newTime; 
              
            return updated; 
          }); 
        }} 
        isFocusMode={true} 
        onPause={pauseStep} 
        onFinish={() => completeStep(activeStep)} 
        /> 
        </div> 
      </div> ); } 
  return ( 
  <div className="study-plan-page"> 
    <button className="back-home-button" onClick={() => navigate("/")} > 
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
        secondsLeft={remainingTimes[index]}
        completed={completedSteps.includes(index)} 
        onStart={() => setActiveStep(index)} /> ))} 
    </div> 
  </div> ); } 
  
export default StudyPlanPage;
