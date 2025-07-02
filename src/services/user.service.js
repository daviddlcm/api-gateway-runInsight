//const { request } = require("express")
const userInfraStructure = require("../infrastructure/user.infrastructure")

const createUser = async (requestUser) => {
    return await userInfraStructure.postUser(requestUser)
}

const getUserById = async (userId) => {
    return await userInfraStructure.getUserById(userId)
}

const updateUser = async (userId, updateUser) => {
    return await userInfraStructure.updateUser(userId, updateUser)
}
const loginUser = async (email, password) => {
    return await userInfraStructure.loginUser(email, password)
}

const addFriend = async (userId, friendId) => {
    return await userInfraStructure.addFriend(userId, friendId)
}
const getAllMyFriends = async (userId) => {
    return await userInfraStructure.getAllMyFriends(userId)
}

module.exports = {
    createUser,
    getUserById,
    updateUser,
    loginUser,
    addFriend,
    getAllMyFriends
}