const axios = require("axios")

const trainingServiceUrl = process.env.TRAINING_SERVICE_URL;

const createTraining = async (userId,trainingData) => {
    const response = await axios.post(`${trainingServiceUrl}/trainings`, trainingData, {
        headers: {
            "user-id": userId,
        }
    });
    return response.data;
}

const getTrainingById = async (userId,trainingId) => {
    const response = await axios.get(`${trainingServiceUrl}/trainings/${trainingId}`, {
        headers: {
            "user-id": userId,
        }
    });
    return response.data;
}

const getTrainingsByUserId = async (userIdMe, userId) => {
    const response = await axios.get(`${trainingServiceUrl}/trainings/user/${userId}`, {
        headers: {
            "user-id": userIdMe,
        }
    });
    return response.data;
}

const getWeeklyTrainingsByUserId = async (userIdMe, userId) => {
    const response = await axios.get(`${trainingServiceUrl}/trainings/weekly-distance/${userId}`, {
        headers: {
            "user-id": userIdMe,
        }
    });
    return response.data;
}

module.exports = {
    createTraining,
    getTrainingById,
    getTrainingsByUserId,
    getWeeklyTrainingsByUserId
}