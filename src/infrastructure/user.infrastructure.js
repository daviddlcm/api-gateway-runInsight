const axios = require("axios");
const FormData = require("form-data");
const userServiceUrl = process.env.USER_SERVICE_URL;
const fs = require("fs-extra");
const path = require("path");

//console.log("User Service URL:", userServiceUrl);
//console.log("User Service URL:", process.env.USER_SERVICE_URL);

const postUser = async (requestUser) => {
  //console.log("User Service URL:", userServiceUrl);
  //console.log("Request User:", requestUser);
  const response = await axios.post(`${userServiceUrl}/users`, requestUser);
  //console.log("Response from User Service:", response.data);
  return response.data;
};

const getUserById = async (userId) => {
  const response = await axios.get(`${userServiceUrl}/users/${userId}`);
  return response.data;
};

const updateUser = async (userId, updatedUser) => {
  const response = await axios.patch(
    `${userServiceUrl}/users/${userId}`,
    updatedUser
  );
  return response.data;
};
const loginUser = async (email, password) => {
  const response = await axios.post(`${userServiceUrl}/users/login`, {
    email,
    password,
  });
  return response.data;
};

const addFriend = async (userId, friendId) => {
  const response = await axios.post(`${userServiceUrl}/friends`, {
    userId,
    friendId,
  });
  return response.data;
};

const getAllMyFriends = async (userId) => {
  const response = await axios.get(`${userServiceUrl}/friends/${userId}`);
  return response.data;
};

const updateTrainingCounter = async (userId) => {
  const response = await axios.patch(
    `${userServiceUrl}/users/training/${userId}`
  );
  return response.data;
};

const updateKilometers = async (userId, kilometers) => {
  const response = await axios.patch(
    `${userServiceUrl}/users/kilometers/${userId}`,
    { kilometers }
  );
  return response.data;
};

const updateBestRythm = async (userId, bestRhythm) => {
  const response = await axios.patch(
    `${userServiceUrl}/users/best-rhythm/${userId}`,
    { bestRhythm }
  );
  return response.data;
};

const addEvent = async (userId, file,dateEvent) => {
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
    const response = await axios.post(
      `${userServiceUrl}/events/${userId}`,
      formData,
      {
        headers: formData.getHeaders(),
      }
    );
    return response.data;
  } finally {
    await fs.unlink(tempPath)
  }
};

const getAllEvents = async () => {
  const response = await axios.get(`${userServiceUrl}/events`);
  return response.data;
};

const getEventById = async (eventId) => {
  const response = await axios.get(`${userServiceUrl}/events/${eventId}`);
  return response.data;
};

const getEventFuture = async (date) => {
//console.log("Date received:", date);
  const response = await axios.get(`${userServiceUrl}/events/by/future`,{
    params: { date}
  });
  return response.data;
};

const getAllBadges = async () => {
  const response = await axios.get(`${userServiceUrl}/badges`);
  console.log(response.data)
  return response.data;
}

const getBadgeById = async (badgeId) => {
  const response = await axios.get(`${userServiceUrl}/badges/${badgeId}`);
  return response.data;
};

const getBadgesByUserId = async (userId) => {
  const response = await axios.get(`${userServiceUrl}/badges/user/${userId}`);
  return response.data;
};

const addBadgeToUser = async (userId, badgeId) => {
  const response = await axios.post(`${userServiceUrl}/badges/user`, {
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
};
