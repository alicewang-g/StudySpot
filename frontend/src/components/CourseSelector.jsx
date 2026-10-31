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
    </div>
  );
}

export default CourseSelector;