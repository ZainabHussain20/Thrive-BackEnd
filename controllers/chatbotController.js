const axios = require('axios');

const getChatbotResponse = async (userMessage) => {
  try {
    const response = await axios.post('http://localhost:5000/chatbot', {
      message: userMessage,
    });

    return response.data.intent; 
  } catch (error) {
    console.error('Error calling chatbot API:', error);
    throw error;
  }
};

module.exports = getChatbotResponse;
