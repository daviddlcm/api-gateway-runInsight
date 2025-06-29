const { request } = require("express")
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

module.exports = {
    createUser,
    getUserById,
    updateUser
}