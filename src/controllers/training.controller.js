const trainingService = require("../services/training.service")

const createTraining = async (req,res) => {
    try{
        const trainingData = req.body;
        const userId = req.headers["user-id"]
        //console.log(trainingData)
        //console.log("User ID:", userId);
        //console.log("Creating training:", trainingData);
        const createdTraining = await trainingService.createTraining(userId,trainingData);
        //const createdTraining = { message:"true"}
        return res.status(201).json(createdTraining);
    }catch(error){
        return res.status(500).json({message: "Error al crear el entrenamiento", error: error.response.data.error})
    }
}

const getTrainingById = async (req, res) => {
    const userId = req.headers["user-id"];
    const trainingId = req.params.id;
    try {
        if(!trainingId){
            return res.status(400).json({ message: "Training ID is required" });
        }
        //console.log("Fetching training with ID:", trainingId, "for user ID:", userId);
        const training = await trainingService.getTrainingById(userId, trainingId);
        
        return res.status(200).json(training);
    } catch (error) {
        //console.log(error.response.data)
        return res.status(500).json({ message: "Error al obtener el entrenamiento", error: error.response.data.error });
    }
}

const getTrainingsByUserId = async (req, res) => {
    const userIdMe = req.headers["user-id"];
    const userId = req.params.id;
    try {
        if(!userId){
            return res.status(400).json({ message: "User ID is required" });
        }
        //console.log("Fetching trainings for user ID:", userId);
        const trainings = await trainingService.getTrainingsByUserId(userIdMe, userId);
        
        return res.status(200).json(trainings);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener los entrenamientos", error: error.message });
    }
}

const getWeeklyTrainingsByUserId = async (req, res) => {
    const userIdMe = req.headers["user-id"];
    const userId = req.params.id;
    try {
        if(!userId){
            return res.status(400).json({ message: "User ID is required" });
        }
        //console.log("Fetching weekly trainings for user ID:", userId);
        const trainings = await trainingService.getWeeklyTrainingsByUserId(userIdMe, userId);
        
        return res.status(200).json(trainings);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener los entrenamientos semanales", error: error.response.data.error });
    }
}

module.exports = {
    createTraining,
    getTrainingById,
    getTrainingsByUserId,
    getWeeklyTrainingsByUserId
}