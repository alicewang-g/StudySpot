import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import StudyPlanPage from "./pages/StudyPlanPage";

import "./App.css";

function App() {
  {/*const [subject, setSubject] = useState("");
  const [customSubject, setCustomSubject] = useState("");
  const [time, setTime] = useState("");
  const [customTime, setCustomTime] = useState("");
  const [plan, setPlan] = useState(null);
  
  const actualSubject = subject === "Other" ? customSubject : subject;
  const actualTime = time === "Other" ? customTime : time;

  async function createPlan() {
    console.log("createPlan was called!");
    const response = await fetch("http://localhost:3001/api/create-plan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        subject: actualSubject,
        time: Number(actualTime)
      })
    });

    console.log("2. Got response");
    console.log("Response status:", response.status);
    const data = await response.json();

    setPlan(data.steps);
    console.log(data);
    console.log("3. Parsed JSON:", data);

  }

  return (
    <div className="app">
      <h1>StudySpot</h1>

      <SubjectSelector
        subject={subject}
        setSubject={setSubject}
        customSubject={customSubject}
        setCustomSubject={setCustomSubject}
      /> 

      <TimeSelector
        time={time}
        setTime={setTime}
        customTime={customTime}
        setCustomTime={setCustomTime}
      />
      <p/>
      <button onClick={createPlan}> {/* () => means runs when clicked, instead of directly running
                                          if need just run when clicked, don't include () -> 
                                          want it to see the whole function not just the result
        Find Study Plan
      </button>

      <StudyPlan
        subject={subject}
        plan={plan}
      /> 
    </div>
  );*/}

  return (
    <BrowserRouter basename = "/StudySpot">
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/study-plan"
          element={<StudyPlanPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App