const express = require("express");
const router = express.Router();
const Chat = require("../models/chat");
const getChatbotResponse = require("../controllers/chatbotControllers"); // Correct path

router.post("/chatbot", async (req, res) => {
  const { message } = req.body;

  try {
    const botResponse = await getChatbotResponse(message);

    // Save the chat to the database
    const chat = new Chat({
      userMessage: message,
      botResponse: botResponse.text,
    });
    await chat.save();

    res.json({ response: botResponse });
  } catch (error) {
    console.error("Error calling Python chatbot server:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
