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

const updateTrainingCounter = async (userId) => {
    return await userInfraStructure.updateTrainingCounter(userId)
}

const updateKilometers = async (userId, kilometers) => {
    return await userInfraStructure.updateKilometers(userId, kilometers)
}

const updateBestRythm = async (userId, bestRhythm) => {
    return await userInfraStructure.updateBestRythm(userId, bestRhythm)
}
const addEvent = async (userId, file, dateEvent) => {
    return await userInfraStructure.addEvent(userId, file, dateEvent)
}

const getAllEvents = async () => {
    return await userInfraStructure.getAllEvents()
}

const getEventById = async (eventId) => {
    return await userInfraStructure.getEventById(eventId)
}

const getEventFuture = async (date) => {
    //console.log(date)
    return await userInfraStructure.getEventFuture(date)
}

const getAllBadges = async () => {
    return await userInfraStructure.getAllBadges()
}

const getBadgeById = async (badgeId) => {
    return await userInfraStructure.getBadgeById(badgeId)
}

const getBadgesByUserId = async (userId) => {
    return await userInfraStructure.getBadgesByUserId(userId)
}

const addBadgeToUser = async (userId, badgeId) => {
    return await userInfraStructure.addBadgeToUser(userId, badgeId)
}

module.exports = {
    createUser,
    getUserById,
    updateUser,
    loginUser,
    addFriend,
    getAllMyFriends,
    updateTrainingCounter,
    updateKilometers,
    updateBestRythm,
    addEvent,
    getAllEvents,
    getEventById,
    getEventFuture,
    getAllBadges,
    getBadgeById,
    getBadgesByUserId,
    addBadgeToUser
}