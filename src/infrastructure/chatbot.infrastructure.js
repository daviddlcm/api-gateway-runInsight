//require("dotenv").config()
const axios = require("axios")

const chatbotServiceUrl = process.env.CHATBOT_SERVICE_URL;

//console.log("chatbotServiceUrl out of the function: ", chatbotServiceUrl)

const clasifyQuestion = async (question, userId) => {
    //console.log("chatbotServiceUrl: ", chatbotServiceUrl)
    const response = await axios.post(`${chatbotServiceUrl}/api/text-mining/classify`, {question,userId})
    //console.log("response: ", response)
    return response.data;
}

const getStatsByUserId = async (userId) => {
    const response = await axios.get(`${chatbotServiceUrl}/api/text-mining/stats/${userId}`)
    return response.data
}

const getStatsWeeklyByUserId = async (userId, days) => {
    const response = await axios.get(`${chatbotServiceUrl}/api/text-mining/stats/${userId}/weekly?days=${days}`)
    return response.data
}

const getCategories = async () => {
    const response = await axios.get(`${chatbotServiceUrl}/api/text-mining/categories`)
    return response.data
}

module.exports = {
    clasifyQuestion,
    getStatsByUserId,
    getStatsWeeklyByUserId,
    getCategories
}