function FloatingTimer({
  secondsLeft,
  onPause,
  task
}) {
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsRemaining = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      secondsRemaining
    ).padStart(2, "0")}`;
  }

  return (
    <div className="floating-timer">

      <div className="floating-timer-header">
        <span>StudySpot</span>
      </div>

      <p className="floating-task">
        {task}
      </p>

      <div className="floating-time">
        {formatTime(secondsLeft)}
      </div>

      <button onClick={onPause}>
        Pause
      </button>

    </div>
  );
}

export default FloatingTimer;