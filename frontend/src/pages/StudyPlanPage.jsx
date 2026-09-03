import { useLocation, useNavigate } from "react-router-dom"; 
import { useState, useRef } from "react"; 

import StudyStep from "../components/StudyStep"; 
import TimerPopup from "../components/TimerPopup";

function StudyPlanPage() { 
  const location = useLocation(); 
  const navigate = useNavigate(); 
  const timerPopupRef = useRef(null);
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
    </div> ); 
  } 

  function startStep(index) {
    timerPopupRef.current?.openPopup();
    setActiveStep(index);
  }

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
    function pauseStep() { 
    // Simply leave focus mode. 
    // We DO NOT mark the task as complete. 
    setActiveStep(null); } 

    function togglePractice(index) { 
      setExpandedPractice((previous) => { 
        if (previous.includes(index)) { 
          return previous.filter((item) => item !== index); 
        } 
        return [...previous, index]; 
      }); 
    
    }
    // If a task is currently active, show focus mode 
    if (activeStep !== null) { 
      const currentStep = plan[activeStep];
      return ( 
        <div className="focus-mode"> 
          <div className="focus-content"> 
            <p className="focus-label"> 
              STUDYING </p> 
            <h1> {currentStep.task}
            </h1> 
            <StudyStep 
              task={currentStep.task} 
              duration={currentStep.duration} 
              material={currentStep.material}
              practice={currentStep.practice}
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
            <TimerPopup
              ref={timerPopupRef}
              secondsLeft={
                activeStep !== null
                  ? remainingTimes[activeStep]
                  : 0
              }
              task={
                activeStep !== null
                  ? plan[activeStep].task
                  : ""
              }
              onPause={pauseStep}
            />
          </div> 
          {currentStep.practice?.questions?.length > 0 && (
            <div className="focus-practice">
              <h3>🧠 Practice</h3>
              <ol>
                {currentStep.practice.questions.map((question, index) => (
                  <li key={index}>
                    {question}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div> 
      ); 
    } 
    
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
            material={step.material}
            practice={step.practice}
            secondsLeft={remainingTimes[index]}
            completed={completedSteps.includes(index)} 
            onStart={() => startStep(index)} 
          /> 
        ))} 
        {step.practice?.questions?.length > 0 && ( 
            <button className="practice-toggle-button" 
            onClick={() => togglePractice(index)} > 
            {expandedPractice.includes(index) 
            ? "Hide Practice Questions" 
            : `View Practice Questions (${step.practice.questions.length})`} 
            </button> 
          )}
          {expandedPractice.includes(index) && ( 
            <div className="practice-preview"> 
              <ol> {step.practice.questions.map((question, questionIndex) => ( 
                <li key={questionIndex}> 
                  {question} 
                </li> 
              ))} 
              </ol> 
            </div> 
          )}
          <TimerPopup
            ref={timerPopupRef}
            secondsLeft={
              activeStep !== null
                ? remainingTimes[activeStep]
                : 0
            }
            task={
              activeStep !== null
                ? plan[activeStep].task
                : ""
            }
            onPause={pauseStep}
          />
      </div> 
  </div> ); 
  } 
  
export default StudyPlanPage;
