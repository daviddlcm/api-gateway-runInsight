const engagementService = require("../services/engagement.service")

const createLog = async (req,res) => {
 try{
    const log = req.body;
    const userId = req.headers["user-id"];

    const engagement = await engagementService.createlog(userId, log);

    return res.status(201).json(engagement);
 }catch(e){
    return res.status(500).json({
        message: "Error creating log",
        error: e.response.data.error
    })
 }
}

const getAllEngagementLogs = async (req,res) => {
    try{
        const userId = req.headers["user-id"];
        const {limit, offset} = req.query;
        const engagementLogs = await engagementService.getAllEngagementLogs(userId, limit, offset);
        return res.status(200).json(engagementLogs);
    }catch(e){
        return res.status(500).json({
            message: "Error getting engagement logs",
            error: e.response.data.error
        })
    }
}

const getEngagementLogsByUserId = async (req,res) => {
    try{
        const userIdMe = req.headers["user-id"];
        const userId = req.params.id;
        const {limit, offset} = req.query;
        const engagementLogs = await engagementService.getEngagementLogsByUserId(userIdMe,userId,limit,offset);
        return res.status(200).json(engagementLogs);
    }catch(e){
        return res.status(500).json({
            message: "Error getting engagement logs",
            error: e.response.data.error
        })
    }
}

const getStatsByUserId = async (req,res) => {
    try{
        const userIdMe = req.headers["user-id"];
        const userId = req.params.id;
        const stats = await engagementService.getStatsByUserId(userIdMe,userId);
        return res.status(200).json(stats);
    }catch(e) {
        return res.status(500).json({
            message: "Error getting stats",
            error: e.response.data.error
        })
    }
}

const getStatsByViews = async (req,res) => {
    try{
        const userIdMe = req.headers["user-id"];
        const stats = await engagementService.getStatsByViews(userIdMe);
        return res.status(200).json(stats);
    }catch(e){
        return res.status(500).json({
            message: "Error getting stats",
            error: e.response.data.error
        })
    }
}

const getAnalyticsByUserId = async (req,res) => {
    try{
        const userIdMe = req.headers["user-id"];
        const userId = req.params.id;
        const {days} = req.query;
        const analytics = await engagementService.getAnalyticsByUserId(userIdMe,userId,days);
        return res.status(200).json(analytics);
    }catch(e){
        return res.status(500).json({
            message: "Error getting analytics",
            error: e.response.data.error
        })
    }
}

module.exports = {
    createLog,
    getAllEngagementLogs,
    getEngagementLogsByUserId,
    getStatsByUserId,
    getStatsByViews,
    getAnalyticsByUserId
}