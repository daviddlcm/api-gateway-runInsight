//require("dotenv").config()
const axios = require("axios");

// Cliente axios configurado para el microservicio de chatbot
const chatbotApiClient = axios.create({
  baseURL: process.env.CHATBOT_SERVICE_URL,
  headers: {
    'x-internal-token': process.env.INTERNAL_TOKEN,
  },
});

const clasifyQuestion = async (question, userId) => {
    //console.log("chatbotServiceUrl: ", process.env.CHATBOT_SERVICE_URL)
    const response = await chatbotApiClient.post('/api/text-mining/classify', {question, userId});
    //console.log("response: ", response)
    return response.data;
}

const getStatsByUserId = async (userId) => {
    const response = await chatbotApiClient.get(`/api/text-mining/stats/${userId}`);
    return response.data
}

const getStatsWeeklyByUserId = async (userId, days) => {
    const response = await chatbotApiClient.get(`/api/text-mining/stats/${userId}/weekly`, {
        params: { days }
    });
    return response.data
}

const getCategories = async () => {
    const response = await chatbotApiClient.get('/api/text-mining/categories');
    return response.data
}

module.exports = {
    clasifyQuestion,
    getStatsByUserId,
    getStatsWeeklyByUserId,
    getCategories
}