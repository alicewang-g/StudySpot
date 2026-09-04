function CourseSelector({
  course,
  setCourse,
  school,
  setSchool,
}) {

  return (
    <div className="course-selector">
      <label>
        Course Information (optional)
      </label>
      <input
        type="text"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
        placeholder="e.g. Biology 101"
      />
      {course.trim() !== "" && ( //.trim() means get rid of white space
        <div>
          <label>
            Enter Your School
          </label>
          <input
            type="text"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            placeholder="e.g. UCLA"
          />
        </div>
      )}
      {/*
      <label>
        What are you preparing for?
      </label>
      <select
        value={exam}
        onChange={(e) => setExam(e.target.value)}
      >
        <option value="">
          Select an Exam
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
      )} */}
    </div>
  );
}

export default CourseSelector;