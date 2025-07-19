const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs-extra");
const path = require("path");

// Cliente axios configurado para el microservicio de usuarios
const userApiClient = axios.create({
  baseURL: process.env.USER_SERVICE_URL,
  headers: {
    'x-internal-token': process.env.INTERNAL_TOKEN,
  },
});

const postUser = async (requestUser) => {
  //console.log("Request User:", requestUser);
  const response = await userApiClient.post('/users', requestUser);
  //console.log("Response from User Service:", response.data);
  return response.data;
};

const getUserById = async (userId) => {
  const response = await userApiClient.get(`/users/${userId}`);
  return response.data;
};

const updateUser = async (userId, updatedUser) => {
  const response = await userApiClient.patch(`/users/${userId}`, updatedUser);
  return response.data;
};

const loginUser = async (email, password) => {
  const response = await userApiClient.post('/users/login', {
    email,
    password,
  });
  return response.data;
};

const addFriend = async (userId, friendId) => {
  const response = await userApiClient.post('/friends', {
    userId,
    friendId,
  });
  return response.data;
};

const getAllMyFriends = async (userId) => {
  const response = await userApiClient.get(`/friends/${userId}`);
  return response.data;
};

const updateRythmKmCounter = async (userIdMe, rhythm, km, totalKm) => {
  // console.log("Updating rhythm and km for user:", userIdMe);
  // console.log("Rhythm:", rhythm, "KM:", km);
  const response = await userApiClient.patch('/users/stats', {
    rhythm,
    km,
    totalKm
  }, {
    headers: {
      "user-id": userIdMe
    }
  });
  
  //console.log("data: ",response)
  return response.data;
}

const addEvent = async (userId, file, dateEvent) => {
  const formData = new FormData();
  //console.log("File received:", file);
  //console.log("entro")
  const tempDir = path.join(__dirname, "..", "temp");
  await fs.ensureDir(tempDir);

  const tempPath = path.join(tempDir, file.name);
  await file.mv(tempPath);

  formData.append("file", fs.createReadStream(tempPath), {
    filename: file.name,
    contentType: file.mimetype,
  });
  formData.append("date_event", dateEvent);
  //console.log("salio")
  //console.log("File to be sent:", formData.getHeaders());
  //formData.get("file");

  try {
    const response = await userApiClient.post(`/events/${userId}`, formData, {
      headers: formData.getHeaders(),
    });
    return response.data;
  } finally {
    await fs.unlink(tempPath)
  }
};

const getAllEvents = async () => {
  const response = await userApiClient.get('/events');
  return response.data;
};

const getEventById = async (eventId) => {
  const response = await userApiClient.get(`/events/${eventId}`);
  return response.data;
};

const getEventFuture = async (date) => {
  //console.log("Date received:", date);
  const response = await userApiClient.get('/events/by/future', {
    params: { date }
  });
  return response.data;
};

const getAllBadges = async () => {
  const response = await userApiClient.get('/badges');
  //console.log(response.data)
  return response.data;
}

const getBadgeById = async (badgeId) => {
  const response = await userApiClient.get(`/badges/${badgeId}`);
  return response.data;
};

const getBadgesByUserId = async (userId) => {
  const response = await userApiClient.get(`/badges/user/${userId}`);
  return response.data;
};

const addBadgeToUser = async (userId, badgeId) => {
  const response = await userApiClient.post('/badges/user', {
    badgeId,
  }, {
    headers: {
      "user-id": userId
    }
  });
  return response.data;
}

module.exports = {
  postUser,
  getUserById,
  updateUser,
  loginUser,
  addFriend,
  getAllMyFriends,
  addEvent,
  getAllEvents,
  getEventById,
  getEventFuture,
  getAllBadges,
  getBadgeById,
  getBadgesByUserId,
  addBadgeToUser,
  updateRythmKmCounter
};
