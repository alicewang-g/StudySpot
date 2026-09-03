function CourseSelector({
  course,
  setCourse,
  exam,
  setExam
}) {

  return (
    <div className="course-selector">
      <label>
        What course are you studying?
      </label>
      <input
        type="text"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
        placeholder="e.g. Biology 101"
      />

      <label>
        What are you preparing for?
      </label>
      <select
        value={exam}
        onChange={(e) => setExam(e.target.value)}
      >
        <option value="">
          Select an exam
        </option>
        <option value="Quiz">
          Quiz
        </option>
        <option value="Midterm">
          Midterm
        </option>
        <option value="Final">
          Final
        </option>
        <option value="Other">
          Other
        </option>
      </select>
      {exam === "Other" && (
        <input
          type="text"
          value={exam}
          onChange={(event) => setExam(event.target.value)}
          placeholder="Enter your exam"
        />
      )}

    </div>
  );
}

export default CourseSelector;