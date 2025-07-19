const chatbotInfrastructure = require("../infrastructure/chatbot.infrastructure")


const clasifyQuestionService = async(question, userId) =>{
    
    return await chatbotInfrastructure.clasifyQuestion(question, userId)
}

const getStatsByUserIdService = async(userId) =>{
    return await chatbotInfrastructure.getStatsByUserId(userId)
}

const getStatsWeeklyByUserIdService = async(userId, days) =>{
    return await chatbotInfrastructure.getStatsWeeklyByUserId(userId, days)
}

const getCategoriesService = async() =>{
    return await chatbotInfrastructure.getCategories()
}

module.exports = {
    clasifyQuestionService,
    getStatsByUserIdService,
    getStatsWeeklyByUserIdService,
    getCategoriesService
}