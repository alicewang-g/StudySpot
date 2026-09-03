import { useEffect } from "react";

function StudyStep({
  task,
  duration,
  material,
  practice,
  secondsLeft,
  setSecondsLeft,
  completed = false,
  onStart,
  onPause,
  onFinish,
  isFocusMode = false
}) {

  /*
    FOCUS MODE TIMER
   */

  useEffect(() => {

    // Don't run the timer when we're not in focus mode
    if (!isFocusMode) {
      return;
    }

    // Timer reached zero
    if (secondsLeft <= 0) {
      onFinish();
      return;
    }
    const timer = setInterval(() => {
    setSecondsLeft((previous) => {
      if (previous <= 1) {
        clearInterval(timer);
        return 0;
      }
      return previous - 1;
    });
  }, 1000);
  return () => clearInterval(timer);

  }, [
    isFocusMode,
    secondsLeft,
    setSecondsLeft,
    onFinish
  ]);


  /*
   * Convert seconds into MM:SS
   */

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  }


  /*
    NORMAL STUDY PLAN
   */
  if (!isFocusMode) {
    return (
      <div
        className={`study-step ${
          completed ? "completed" : ""
        }`}
      >
        <div className="study-step-info">
          <h3>{task}</h3>
          <p>
            {formatTime(secondsLeft)}
          </p>
          {material && material.pages && (
            <div className="material-reference">
              <strong>📖 Your Material</strong>
              <p>Pages {material.pages}</p>
            </div>
          )}
          {/*{practice && practice.questions && practice.questions.length > 0 && (
            <div className="practice-section">
              <p>
                {practice.questions.length} practice questions
              </p>
            </div>
            
          )}*/}
        </div>

        {completed ? (
          <div className="completed-message">
            ✓ Completed
          </div>
        ) : (
          <button
            className="start-button"
            onClick={onStart}>
            Start
          </button>
        )}

      </div>
    );
  }


  /*
    FOCUS MODE
   */

  return (
    <div className="focus-timer">

      <div className="timer">
        {formatTime(secondsLeft)}
      </div>

      <button
        className="pause-button"
        onClick={onPause}
      >
        Pause
      </button>

    </div>
  );
}

export default StudyStep;

