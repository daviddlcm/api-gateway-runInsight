const axios = require("axios");

// Cliente axios configurado para el microservicio de entrenamientos
const trainingApiClient = axios.create({
  baseURL: process.env.TRAINING_SERVICE_URL,
  headers: {
    'x-internal-token': process.env.INTERNAL_TOKEN,
  },
});

const createTraining = async (userId, trainingData) => {
    const response = await trainingApiClient.post('/trainings', trainingData, {
        headers: {
            "user-id": userId,
        }
    });
    return response.data;
}

const getTrainingById = async (userId, trainingId) => {
    const response = await trainingApiClient.get(`/trainings/${trainingId}`, {
        headers: {
            "user-id": userId,
        }
    });
    return response.data;
}

const getTrainingsByUserId = async (userIdMe, userId) => {
    const response = await trainingApiClient.get(`/trainings/user/${userId}`, {
        headers: {
            "user-id": userIdMe,
        }
    });
    return response.data;
}

const getWeeklyTrainingsByUserId = async (userIdMe, userId) => {
    // console.log("userIdMe: ", userIdMe)
    // console.log("userId: ", userId)
    const response = await trainingApiClient.get(`/trainings/weekly-distance/${userId}`, {
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