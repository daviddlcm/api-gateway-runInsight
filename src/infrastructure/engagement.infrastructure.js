const axios = require("axios")

const engagementCliente = axios.create({
baseURL: process.env.ENGAGEMENT_SERVICE_URL,
  headers: {
    'x-internal-token': process.env.INTERNAL_TOKEN,
  },
})

const createLog = async (userId,log) => {
    const response = await engagementCliente.post("/api/engagement-logs",log,{
        headers: {
          "user-id": userId
        }
    });
    //console.log("RESPONSE createlog: ", response.data)
    return response.data
}

const getAllEngagementLogs = async (userId, limit,offset) => {
  const resposne  = await engagementCliente.get("/api/engagement-logs",{
    headers: {
      "user-id": userId
    },
    params: {
      offset,
      limit
    }
  })
  return resposne.data
}

const getEngagementLogsByUserId = async (userIdMe,userId,limit,offset) => {
  const response = await engagementCliente.get(`/api/engagement-logs/user/${userId}`,{
    headers: {
      "user-id": userIdMe
    },
    params: {
      offset,
      limit
    }
  })
  return response.data
}

const getStatsByUserId = async (userIdMe, userId) => {
  const response = await engagementCliente.get(`/api/engagement-logs/stats/user/${userId}`,{
    headers: {
      "user-id": userIdMe
    }
  })
  return response.data
}

const getStatsByViews = async (userIdMe) => {
  //console.log("entro a infraestructura")
  const response = await engagementCliente.get(`/api/engagement-logs/stats/by/views`,{
    headers: {
      "user-id": userIdMe
    }
  })
  return response.data
}

const getAnalyticsByUserId = async (userIdMe,userId,days) => {
  const response = await engagementCliente.get(`/api/engagement-logs/analytics/user/${userId}`,{
    headers: {
      "user-id": userIdMe
    },
    params: {
      days
    }
  })
  return response.data
}



module.exports = {
    createLog,
    getAllEngagementLogs,
    getEngagementLogsByUserId,
    getStatsByUserId,
    getStatsByViews,
    getAnalyticsByUserId
}