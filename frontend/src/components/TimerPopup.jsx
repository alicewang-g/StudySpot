import { forwardRef, useImperativeHandle,useEffect, useRef } from "react";

const TimerPopup = forwardRef(
    function TimerPopup( 
    { 
        secondsLeft, 
        task, 
        onPause 
    }, ref 
) {
  const popupRef = useRef(null);

  function formatTime(seconds) { 
    const minutes = Math.floor(seconds / 60); 
    const remaining = seconds % 60; 
    return `${String(minutes).padStart(2, "0")}:${String( remaining ).padStart(2, "0")}`; 
  }

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

    const popup = popupRef.current;

    popup.document.write(
        ` <!DOCTYPE html> 
        <html> 
            <head> 
                <title>
                    StudySpot Timer
                 </title> 
            </head>
            <body> 
                <div style= "
                font-family: Arial, sans-serif; 
                padding: 20px; 
                text-align: center; 
                margin: 0; " > 
                    <h2>StudySpot</h2> 
                    <p id="task"> ${task} </p>
                    <div id= "timer" style=" f
                    ont-size: 42px; 
                    font-weight: 
                    bold; 
                    margin: 20px 0; " > 
                        ${formatTime(secondsLeft)} 
                    </div>
                    <button id="pauseButton" style=" 
                    padding: 8px 20px; 
                    font-size: 16px; 
                    cursor: pointer; " > 
                        Pause 
                    </button> 
                </div> 
            </body>
        </html> 
    `);
    popup.document.close();
    popup.document 
        .getElementById("pauseButton") 
        .addEventListener("click", () => { 
            onPause(); 
        }); 
    popup.focus();
    /* * Allow StudyPlanPage to open the popup. */ 
    useImperativeHandle(ref, () => ({ 
        openPopup 
    }));
    const checkClosed = setInterval(() => { 
        if (popup.closed) { 
            clearInterval(checkClosed); 
            popupRef.current = null; 
        } 
    }, 500);

  }

  useEffect(() => {
    if (!popupRef.current || popupRef.current.closed) {
      return;
    }
    const timer = popupRef.current.document.getElementById( "timer" );
    const taskElement = popupRef.current.document.getElementById( "task" );
    if (timer) { 
        timer.textContent = formatTime(secondsLeft); 
    } 
    if (taskElement) { 
        taskElement.textContent = task; 
    } 
  }, [secondsLeft, task]);

  return (
    <button onClick={openPopup}>
      Open Floating Timer
    </button>
  );
});

export default TimerPopup;