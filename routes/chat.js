const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/chatbot", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post("http://localhost:5000/chatbot", {
      message: message,
    });

    res.json({ intent: response.data.intent });
  } catch (error) {
    console.error("Error calling Python chatbot server:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
