const engagementIngrastructure = require("../infrastructure/engagement.infrastructure")

const createlog = async (userId, log) => {
    return await engagementIngrastructure.createLog(userId, log);
}

const getAllEngagementLogs = async (userId, limit, offset) => {
    return await engagementIngrastructure.getAllEngagementLogs(userId, limit, offset);
}

const getEngagementLogsByUserId = async (userIdMe,userId,limit,offset) => {
    return await engagementIngrastructure.getEngagementLogsByUserId(userIdMe,userId,limit,offset);
}

const getStatsByUserId = async (userIdMe, userId) => {
    return await engagementIngrastructure.getStatsByUserId(userIdMe, userId);
}

const getStatsByViews = async (userIdMe) => {
    return await engagementIngrastructure.getStatsByViews(userIdMe);
}

const getAnalyticsByUserId = async (userIdMe,userId,days) => {
    return await engagementIngrastructure.getAnalyticsByUserId(userIdMe,userId,days);
}

module.exports = {
    createlog,
    getAllEngagementLogs,
    getEngagementLogsByUserId,
    getStatsByUserId,
    getStatsByViews,
    getAnalyticsByUserId
}