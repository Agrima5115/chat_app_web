const express = require("express");
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.post("/messages", (req, res) => {
  // Access the 'message' from the body
  const message = req.body.message;

  // Check if 'message' is defined
  if (message) {
    // Respond with the message (You can also process the message here)
    res.json({ reply: `You said: ${message}` });
  } else {
    res.status(400).json({ error: "Message not provided" });
  }
});


const port = 5001;  // Change port number
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
