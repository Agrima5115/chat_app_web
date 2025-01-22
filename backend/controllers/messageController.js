const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.GROQ_API_KEY;
const API_URL = "https://api.openai.com/v1/completions"; // Use the appropriate URL for Groq if different

// Controller function to handle incoming messages
const handleMessage = async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await axios.post(
      API_URL,
      {
        model: "gpt-3.5-turbo", // Use the Groq model or specify which one you want
        prompt: userMessage,
        max_tokens: 150,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`,
        },
      }
    );
    
    const groqResponse = response.data.choices[0].text.trim();
    res.json({ message: groqResponse });
  } catch (error) {
    console.error("Error communicating with Groq API:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { handleMessage };
