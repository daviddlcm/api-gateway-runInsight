const axios = require("axios")

const userServiceUrl = process.env.USER_SERVICE_URL;
//console.log("User Service URL:", userServiceUrl);

const postUser = async (requestUser) => {
    //console.log("Request User:", requestUser);
    const response = await axios.post(`${userServiceUrl}/users`,requestUser)
    return response.data;
}

const getUserById = async (userId) => {
    const response = await axios.get(`${userServiceUrl}/users/${userId}`)
    return response.data;
}

const updateUser = async (userId, updatedUser) => {
    const response = await axios.patch(`${userServiceUrl}/users/${userId}`, updatedUser);
    return response.data;
}
const loginUser = async (email, password) => {
    const response = await axios.post(`${userServiceUrl}/users/login`, { email, password });
    return response.data;
}

const addFriend = async (userId, friendId) => {
    const response = await axios.post(`${userServiceUrl}/friends`, { userId,friendId });
    return response.data;
}

const getAllMyFriends = async (userId) => {
    const response = await axios.get(`${userServiceUrl}/friends/${userId}`);
    return response.data;
}

module.exports = {
    postUser,
    getUserById,
    updateUser,
    loginUser,
    addFriend,
    getAllMyFriends
}