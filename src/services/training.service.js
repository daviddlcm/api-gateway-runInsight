const trainingInfrastructure = require('../infrastructure/training.infrastructure');
const userInfrastructure = require("../infrastructure/user.infrastructure")
const createTraining = async (userId,trainingData) => {
    const trainingResponse = await trainingInfrastructure.createTraining(userId,trainingData);
    // const trainingResponse = { message: "true"}
    
    
    const {distance_km, rhythm } = trainingData;

    const {totalKm} = await trainingInfrastructure.getWeeklyTrainingsByUserId(userId,userId)
    //console.log("weelyKm: ", weelyKm)

    //console.log("Entro: ", userId,distance_km, rhythm)
    const response = await userInfrastructure.updateRythmKmCounter(userId,rhythm,distance_km, totalKm)
    //console.log("response: ", response)
    
    //console.log(response)

    return response.badges;
}

const getTrainingById = async(userId, trainingId) => {
    return await trainingInfrastructure.getTrainingById(userId, trainingId);
}

const getTrainingsByUserId = async(userIdMe, userId) => {
    return await trainingInfrastructure.getTrainingsByUserId(userIdMe, userId);
}

const getWeeklyTrainingsByUserId = async(userIdMe, userId) => {
    return await trainingInfrastructure.getWeeklyTrainingsByUserId(userIdMe, userId);
}

module.exports = {
    createTraining,
    getTrainingById,
    getTrainingsByUserId,
    getWeeklyTrainingsByUserId
}