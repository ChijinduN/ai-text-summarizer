const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(bodyParser.json()); // To handle JSON payloads
app.use(cors()); // To enable cross-origin requests

// Replace 'YOUR_OPENAI_API_KEY' with your actual OpenAI API key
const OPENAI_API_KEY = "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";

// POST route for summarization
app.post("/summarize", async (req, res) => {
  const { text } = req.body; // Extract the text from the request body

  try {
    // Send request to OpenAI API
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "text-davinci-003",
        prompt: `Summarize the following text:\n\n${text}`,
        max_tokens: 100,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    const summary = response.data.choices[0].text.trim(); // Extract summary from the response
    res.json({ summary }); // Return summary to frontend
  } catch (error) {
    console.error(error); // Log error to the server console
    res.status(500).json({ error: "Error summarizing text" }); // Send error response
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.post("/summarize", async (req, res) => {
    try {
      console.log("Request body:", req.body); // Log the request body
      const { text } = req.body;
  
      if (!text) {
        return res.status(400).json({ error: "Text is required" });
      }
  
      // Make OpenAI API request
      const response = await axios.post(
        "https://api.openai.com/v1/completions",
        {
          model: "text-davinci-003",
          prompt: `Summarize the following text:\n\n${text}`,
          max_tokens: 100,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`, // Ensure your OpenAI API key is correct
          },
        }
      );
  
      const summary = response.data.choices[0].text.trim(); // Get the summary
      console.log("Summary received:", summary); // Log the summary
      res.json({ summary }); // Send the summary back to the frontend
    } catch (error) {
      // Log detailed error information to help identify the issue
      console.error("Error in API request:", error.message || error.response.data || error);
      res.status(500).json({ error: "An error occurred while summarizing" });
    }
  });
  
