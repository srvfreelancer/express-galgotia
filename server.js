const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Groq = require("groq-sdk");

const app = express();
const port = process.env.PORT || 3000; // ← this line is key!

const groq = new Groq({
  apiKey: "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",
});

app.use(cors());
app.use(bodyParser.json());

app.post("/getGroqChatCompletion", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: userMessage,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    const botResponse = chatCompletion.choices[0]?.message?.content || "Sorry, I couldn't process your request.";
    res.json({ response: botResponse });
  } catch (error) {
    console.error("Error calling Groq API:", error);
    res.status(500).json({ response: "There was an error. Please try again later." });
  }
});

app.get("/", (req, res) => {
  res.send("Groq Chat API is live!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
