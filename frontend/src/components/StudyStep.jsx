import { useEffect, useState } from "react";

function StudyStep({ task, duration }) {

  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [running, setRunning] = useState(false);

  useEffect(() => {

    if (!running || timeLeft <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);

  }, [running, timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="study-step">

      <h2>{task}</h2>

      <div className="timer">
        {minutes}:{seconds.toString().padStart(2, "0")}
      </div>

      <button onClick={() => setRunning(!running)}>
        {running ? "Pause" : "Start"}
      </button>

    </div>
  );
}

export default StudyStep;