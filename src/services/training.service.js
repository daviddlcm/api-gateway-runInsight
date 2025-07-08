const trainingInfrastructure = require('../infrastructure/training.infrastructure');
const userInfrastructure = require("../infrastructure/user.infrastructure")
const createTraining = async (userId,trainingData) => {
    const trainingResponse = await trainingInfrastructure.createTraining(userId,trainingData);

    const {distance_km, rhythm } = trainingData;

    await Promise.all([
        userInfrastructure.updateTrainingCounter(userId),
        userInfrastructure.updateKilometers(userId, distance_km),
        userInfrastructure.updateBestRythm(userId, rhythm)
    ])
    return trainingResponse;
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