function TimeSelector({ time, setTime, customTime, setCustomTime }) {

  return (
    <>
      <p>How much time do you have?</p>
{/*
      <select
        value={time}
        onChange={(event) => setTime(event.target.value)}
      >
        <option value="">Select time</option>
        <option value="30">30 minutes</option>
        <option value="60">1 hour</option>
        <option value="90">1.5 hours</option>
        <option value="120">2 hours</option>
        <option value="Other">Other</option>

      </select>
      
      {time === "Other" && (
        <input
          type="text"
          value={customTime}
          onChange={(event) => setCustomTime(event.target.value)}
          placeholder="Enter your time"
        />
      )}
        */}
        <input 
        type="text" 
        value={time} 
        onChange={(e) => setTime(e.target.value)} 
        placeholder="Minutes" 
        />
    </>
  );
}
export default TimeSelector