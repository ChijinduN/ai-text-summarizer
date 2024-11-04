import React, { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");

  const handleSummarize = async () => {
    const response = await fetch("http://localhost:5000/summarize", {
      method: "POST", // Make sure it's POST
      headers: { "Content-Type": "application/json" }, // Set headers to send JSON
      body: JSON.stringify({ text }), // Send the text from the input as the request body
    });
    const data = await response.json();
    setSummary(data.summary); // Set the summary in the state
  };
  

  return (
    <div className="App">
      <h1>AI Text Summarizer</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your text here..."
        rows="10"
        cols="50"
      />
      <br />
      <button onClick={handleSummarize}>Summarize</button>
      <div>
        <h3>Summary:</h3>
        <p>{summary}</p>
      </div>
    </div>
  );
}

export default App;
