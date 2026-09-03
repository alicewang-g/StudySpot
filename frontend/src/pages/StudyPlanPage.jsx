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
    setActiveStep(index);
    // Removed timerPopupRef.current?.openPopup(); from startStep
  }

  function openFloatingTimer() {
    timerPopupRef.current?.openPopup();
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
    } 

    function togglePractice(index) { 
      setExpandedPractice((previous) => { 
        if (previous.includes(index)) { 
          return previous.filter((item) => item !== index); 
        } 
        return [...previous, index]; 
      }); 
    
    }
  // Added backwards compatibility for 'resources' format
  const material =currentStep.material || currentStep.resources;

    // If a task is currently active, show focus mode 
  if (activeStep !== null) {
    //Extracted current step to a variable
    const currentStep = plan[activeStep];

    return (
      <div className="focus-mode">

        {/* TimerPopup relocated inside focus-mode conditional */}
        <TimerPopup
          ref={timerPopupRef}
          secondsLeft={remainingTimes[activeStep]}
          task={currentStep.task}
          onPause={pauseStep}
        />

        <div className="focus-content">

          <p className="focus-label">
            STUDYING
          </p>

          <h1>
            {/* [CHANGED]: Uses currentStep variable */}
            {currentStep.task}
          </h1>

          <StudyStep
            /* [CHANGED]: Uses currentStep variable & normalized material prop */
            task={currentStep.task}
            duration={currentStep.duration}
            material={material}
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

          {/* Manual button to trigger floating popup */}
          <button
            className="open-floating-timer-button"
            onClick={openFloatingTimer}
          >
            Open Floating Timer
          </button>

          {/* Study Material */}
          {/* Updated conditional check & added fallback paragraph */}
          {material && (
            <div className="focus-material">
              <h3>📖 Study Material</h3>
              {material.pages ? (
                <p>
                  Pages {material.pages}
                </p>
              ) : (
                <p>
                  Your uploaded study material is being used
                  for this task.
                </p>
              )}
            </div>
          )}

          {/* Practice Questions */}
          {/* Uses currentStep variable */}
          {currentStep.practice?.questions?.length > 0 && (
            <div className="focus-practice">
              <h3>🧠 Practice Questions</h3>
              <ol>
                {currentStep.practice.questions.map(
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
    );
  }

  /*-------REGULAR STUDY PLAN--------*/

  return (
    <div className="study-plan-page">
      {/* TimerPopup component removed from top-level layout */}

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

          {plan.map((step, index) => {
            return (
              <div
                key={index}
                className="study-step-container"
              >
                <StudyStep
                  task={step.task}
                  duration={step.duration}
                  material={material}
                  practice={step.practice}
                  secondsLeft={remainingTimes[index]}
                  completed={completedSteps.includes(index)}
                  onStart={() => startStep(index)}
                />

                {/* Practice Questions */}
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
            );
          })}
        </div>
      </div>
    </div>
  );
}
  
export default StudyPlanPage;
