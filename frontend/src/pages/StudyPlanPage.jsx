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
  const [expandedPractice, setExpandedPractice] = useState([]);

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
      setActiveStep(null); 
      // Open the floating timer 
      timerPopupRef.current?.openPopup();
    } 

    function togglePractice(index) { 
      setExpandedPractice((previous) => { 
        if (previous.includes(index)) { 
          return previous.filter((item) => item !== index); 
        } 
        return [...previous, index]; 
      }); 
    
    }

    // If a task is currently active, show focus mode 
    return (
    <div className="study-plan-page">

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

      {/*-------------- FOCUS MODE --------------- */}

      {activeStep !== null ? (
        <div className="focus-mode">

          <div className="focus-content">

            <p className="focus-label">
              STUDYING
            </p>

            <h1>
              {plan[activeStep].task}
            </h1>

            <StudyStep
              task={plan[activeStep].task}
              duration={plan[activeStep].duration}
              material={plan[activeStep].material}
              practice={plan[activeStep].practice}
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

            {/* Study Material */}
            {plan[activeStep].material?.pages && (
              <div className="focus-material">
                <h3>📖 Study Material</h3>

                <p>
                  Pages {plan[activeStep].material.pages}
                </p>
              </div>
            )}

            {/* Practice Questions */}
            {plan[activeStep].practice?.questions?.length > 0 && (
              <div className="focus-practice">

                <h3>🧠 Practice Questions</h3>

                <ol>
                  {plan[activeStep].practice.questions.map(
                    (question, index) => (
                      <li key={index}>
                        {question}
                      </li>
                    )
                  )}
                </ol>

              </div>
            )}

          </div>
        </div>

      ) : (

        /*------------REGULAR STUDY PLAN----------*/

        <div className="study-plan-content">

          <button
            className="back-home-button"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>

          <h1>Your Study Plan</h1>

          <h2>{subject}</h2>

          <div className="study-steps">

            {plan.map((step, index) => (
              <div
                key={index}
                className="study-step-container"
              >

                <StudyStep
                  task={step.task}
                  duration={step.duration}
                  material={step.material}
                  practice={step.practice}
                  secondsLeft={remainingTimes[index]}
                  completed={completedSteps.includes(index)}
                  onStart={() => startStep(index)}
                />

                {/* Practice Question Button */}
                {step.practice?.questions?.length > 0 && (
                  <>
                    <button
                      className="practice-toggle-button"
                      onClick={() => togglePractice(index)}
                    >
                      {expandedPractice.includes(index)
                        ? "Hide Practice Questions"
                        : `View Practice Questions (${step.practice.questions.length})`}
                    </button>

                    {/* Expanded Practice Questions */}
                    {expandedPractice.includes(index) && (
                      <div className="practice-preview">

                        <h4>
                          🧠 Practice Questions
                        </h4>

                        <ol>
                          {step.practice.questions.map(
                            (question, questionIndex) => (
                              <li key={questionIndex}>
                                {question}
                              </li>
                            )
                          )}
                        </ol>

                      </div>
                    )}
                  </>
                )}

              </div>
            ))}

          </div>

        </div>
      )}
    </div>
  );
} 
  
export default StudyPlanPage;
