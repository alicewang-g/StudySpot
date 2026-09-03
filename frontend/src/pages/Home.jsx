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
      const formData = new FormData();

      formData.append("subject", subject);
      formData.append("time", Number(time));
      formData.append("course", course);
      formData.append("exam", exam)

      if (file) {
        formData.append("file", file);
      }

      const response = await fetch(
        "https://studyspot-qmap.onrender.com/api/create-plan",
        {
          method: "POST",
          body: formData
        }
      );
      console.log("File before sending:", file);
      const data = await response.json();
      if (data.valid === false) {
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
          onFileSelect={setFile}
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