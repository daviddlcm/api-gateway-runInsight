const chatbotService = require("../services/chatbot.service")

const clasifyQuestion = async (req, res) =>{
    const {question} = req.body;
    const userId = req.headers["user-id"];
    try{
        // console.log("question: ", question)
        // console.log("userId: ", userId)
        const response = await chatbotService.clasifyQuestionService(question, userId)
        return res.status(201).json(response)
    }catch(e){
        return res.status(500).json({message: "Error al clasificar la pregunta", error: e.response.data.error})
    }
}

const getStatsByUserId = async (req, res) =>{
    //const userId = req.headers["user-id"];
    const userId = req.params.id;

    try{
        if(!userId){
            return res.status(400).json({message: "User ID is required"})
        }
        const response = await chatbotService.getStatsByUserIdService(userId)
        return res.status(200).json(response)
    }catch(e){
        return res.status(500).json({message: "Error al obtener las estadísticas", error: e.response.data.error})
    }
}

const getStatsWeeklyByUserId = async (req, res) =>{
    const userId = req.params.id;
    const days = req.query.days;
    //console.log("days: ", days)
    try{
        if(!userId){
            return res.status(400).json({message: "User ID is required"})
        }
        const response = await chatbotService.getStatsWeeklyByUserIdService(userId, days)
        return res.status(200).json(response)
    }catch(e){
        return res.status(500).json({message: "Error al obtener las estadísticas semanales", error: e.response.data.error})
    }
}

const getCategories = async (req, res) =>{
    try{
        const response = await chatbotService.getCategoriesService()
        return res.status(200).json(response)
    }
    catch(e){
        return res.status(500).json({message: "Error al obtener las categorías", error: e.response.data.error})
    }
}

module.exports = {
    clasifyQuestion,
    getStatsByUserId,
    getStatsWeeklyByUserId,
    getCategories
}