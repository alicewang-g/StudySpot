import { useEffect, useRef } from "react";

function TimerPopup({
  secondsLeft,
  task,
  onPause
}) {
  const popupRef = useRef(null);

  function openPopup() {
    popupRef.current = window.open(
      "",
      "StudySpotTimer",
      "width=300,height=220"
    );

    if (!popupRef.current) {
      alert(
        "Please allow popups for StudySpot to use the floating timer."
      );
      return;
    }

    popupRef.current.document.body.innerHTML = `
      <div id="timer"></div>
    `;
  }

  useEffect(() => {
    if (!popupRef.current || popupRef.current.closed) {
      return;
    }

    popupRef.current.document.body.innerHTML = `
      <div style="
        font-family: Arial;
        padding: 20px;
        text-align: center;
      ">
        <h2>StudySpot</h2>

        <p>${task}</p>

        <div style="
          font-size: 42px;
          font-weight: bold;
          margin: 20px 0;
        ">
          ${formatTime(secondsLeft)}
        </div>
      </div>
    `;
  }, [secondsLeft, task]);

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remaining = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remaining
    ).padStart(2, "0")}`;
  }

  return (
    <button onClick={openPopup}>
      Open Floating Timer
    </button>
  );
}

export default TimerPopup;