import { useState } from "react";
import { useNavigate } from "react-router-dom";

import SubjectSelector from "../components/SubjectSelector";
import TimeSelector from "../components/TimeSelector";
import CourseSelector from "../components/CourseSelector";
import Upload from "../components/Upload";
import Loading from "../components/Loading";

function Home() {

  const [subject, setSubject] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState("");
  const [course, setCourse] = useState("");
  const [exam, setExam] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function createPlan() {
    setError("");
    setLoading(true);
    try {

      const response = await fetch(
        "http://localhost:3001/api/create-plan",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            subject: subject,
            time: Number(time)
          })
        }
      );
      const data = await response.json();
      if (!response.ok) {
        setError("That is not a valid subject. Please enter another subject.");
        setLoading(false);
        return;
      }
      navigate("/study-plan", {
        state: {
          plan: data.steps,
          subject: data.subject || subject
        }
      });

    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>StudySpot</h1>
      {loading ? (<Loading />) : (
        <>
        <SubjectSelector
          subject={subject}
          setSubject={setSubject}
        />
        <CourseSelector
          course={course}
          setCourse={setCourse}
          exam={exam}
          setExam={setExam}
        />
        <TimeSelector
          time={time}
          setTime={setTime}
        />
        {error && (<p className="error-message">
          {error}
        </p>)}
        <Upload
          file={file}
          setFile={setFile}
        />
        <button className="create-plan-button" onClick={createPlan}>
            Create Study Plan
        </button>
      </>
      )}
    </div>
  );
}

export default Home