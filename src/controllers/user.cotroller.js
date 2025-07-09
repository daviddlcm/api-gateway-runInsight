const userService = require("../services/user.service");
const fs = require("fs-extra");

const createUser = async (req, res) => {
  const user = req.body;
  try {
    //console.log("Creating user:", user);
    const createdUser = await userService.createUser(user);
    return res.status(201).json(createdUser);
  } catch (error) {
    // console.error("Error creating user:", error);
    return res
      .status(500)
      .json({ message: "Error al crear usuario", error: error.response.data.error });
  }
};

const getUserById = async (req, res) => {
  const authUserId = req.headers["user-id"];
  //console.log("Auth User ID:", authUserId);
  const userId = req.params.id;
  try {
    const user = await userService.getUserById(userId);
    // if (!user) {
    //     return res.status(404).json({ message: "User not found" });
    // }
    return res.status(200).json(user);
  } catch (error) {
    // console.error("Error fetching user:", error);
    return res
      .status(500)
      .json({ message: "Error al obtener un usuario", error: error.response.data.error });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.id;
  const updateUser = req.body;
  try {
    const updatedUser = await userService.updateUser(userId, updateUser);
    // if (!updatedUser) {
    //     return res.status(404).json({ message: "User not found" });
    // }
    return res.status(200).json(updatedUser);
  } catch (error) {
    // console.error("Error updating user:", error);
    return res.status(500).json({
      message: "Error al actualizar un usuario",
      error: error.response.data.error,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userService.loginUser(email, password);
    
    return res.status(200).json(user);
  } catch (error) {
    // console.error("Error logging in:", error);
    return res
      .status(500)
      .json({ message: "Error al iniciar sesión", error: error.response.data.error });
  }
};

const addFriend = async (req, res) => {
  const { userId, friendId } = req.body;
  try {
    const updatedUser = await userService.addFriend(userId, friendId);
    return res.status(200).json(updatedUser);
  } catch (error) {
    // console.error("Error adding friend:", error);
    return res
      .status(500)
      .json({ message: "Error al agregar amigo", error: error.response.data.error });
  }
};

const getAllMyFriends = async (req, res) => {
  const userId = req.params.id;
  try {
    const friends = await userService.getAllMyFriends(userId);
    return res.status(200).json(friends);
  } catch (error) {
    // console.error("Error fetching friends:", error);
    return res
      .status(500)
      .json({ message: "Error al obtener amigos", error: error.response.data.error });
  }
};



const addEvent = async (req, res) => {
  // Assuming you're using multer for file uploads
  //console.log("File received:", file);
  try {
    const userId = req.params.id;
    const file = req.files?.file;
    const dateEvent = req.body.date_event;
    //console.log(req.body.date_event)
    //console.log("File received:", req.file);
    // const tempPath = "./temp/" + file.name;
    // await file.mv(tempPath);
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    
    if(!dateEvent) {
      return res.status(400).json({ message: "No date provided" });
    }

    const event = await userService.addEvent(userId, file, dateEvent);

    //fs.unlink(tempPath);

    // const event = {
    //     message:"prueba"
    // }
    return res.status(201).json(event);
  } catch (error) {
    // console.error("Error adding event:", error);
    return res
      .status(500)
      .json({ message: "Error al agregar evento", error: error.response.data.error, errorCode: error.message });
  }
};

const getAllEvents = async (req, res) => {
  try {
    //console.log("Fetching all events");
    const events = await userService.getAllEvents();
    return res.status(200).json(events);
  } catch (error) {
    // console.error("Error fetching events:", error);
    return res
      .status(500)
      .json({ message: "Error al obtener eventos", error: error.response.data.error });
  }
};

const getEventById = async (req, res) => {
  const eventId = req.params.id;
  try {
    const event = await userService.getEventById(eventId);
    return res.status(200).json(event);
  } catch (error) {
    // console.error("Error fetching event:", error);
    return res
      .status(500)
      .json({ message: "Error al obtener evento", error: error.response.data.error });
  }
};

const getEventFuture = async (req, res) => {
  try {
    //console.log("prueba")
    const {date} = req.query;
    //console.log("Date received:", req.query.date);
    const events = await userService.getEventFuture(date);
    return res.status(200).json(events);
  } catch (error) {
    // console.error("Error fetching future events:", error);
    return res
      .status(500)
      .json({
        message: "Error al obtener eventos futuros",
        error: error.response.data.error,
      });
  }
};

const getAllBadges = async (req, res) => {
  try {
    //console.log("Fetching all badges");
    const badges = await userService.getAllBadges();
    return res.status(200).json(badges);
  } catch (error) {
    // console.error("Error fetching badges:", error);
    return res
      .status(500)
      .json({ message: "Error al obtener insignias", error: error.response.data.error });
  }
}

const getBadgesByUserId = async (req, res) => {
  const userId = req.params.id;
  const userIdMe = req.headers["user-id"];
  try {
    const badges = await userService.getBadgesByUserId(userId);
    return res.status(200).json(badges);
  } catch (error) {
    // console.error("Error fetching badges by user ID:", error);
    return res
      .status(500)
      .json({ message: "Error al obtener insignias del usuario", error: error.response.data.error });
  }
}

const getBadgeById = async (req, res) => {
  const badgeId = req.params.id;
  try {
    const badge = await userService.getBadgeById(badgeId);
    return res.status(200).json(badge);
  } catch (error) {
    // console.error("Error fetching badge:", error);
    return res
      .status(500)
      .json({ message: "Error al obtener insignia", error: error.response.data.error });
  }
};

const addBadgeToUser = async (req, res) => {
  const userId = req.headers["user-id"];
  //console.log(userId)
  const { badgeId } = req.body;
  //console.log(badgeId)
  try {
    const updatedUser = await userService.addBadgeToUser(userId, badgeId);
    return res.status(200).json(updatedUser);
  } catch (error) {
    // console.error("Error adding badge to user:", error);
    return res
      .status(500)
      .json({ message: "Error al agregar insignia al usuario", error: error.response.data.error });
  }
};

module.exports = {
  createUser,
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
  addBadgeToUser
};
