function SubjectSelector({ subject, setSubject, customSubject, setCustomSubject }) {
  return (
    <>
      <p>What do you want to study?</p>
{/*}
      <select
        value={subject}
        onChange={(event) => setSubject(event.target.value)}
      >
        <option value="">Select a subject</option>
        <option value="Biology">Biology</option>
        <option value="Math">Math</option>
        <option value="Computer Science">Computer Science</option>
        <option value="Physics">Physics</option>
        <option value="Other">Other</option>
        
      </select> 

      {subject === "Other" && (
        <input
          type="text"
          value={customSubject}
          onChange={(event) => setCustomSubject(event.target.value)}
          placeholder="Enter your subject"
        />
      )}*/}
      <input 
      type="text" 
      value={subject} 
      onChange={(e) => setSubject(e.target.value)} 
      placeholder="Enter a subject" 
      />
    </>
  );
}
export default SubjectSelector