const userService = require("../services/user.service");
const fs = require("fs-extra");

const createUser = async (req, res) => {
  const user = req.body;
  try {
    const createdUser = await userService.createUser(user);
    return res.status(201).json(createdUser);
  } catch (error) {
    // console.error("Error creating user:", error);
    return res
      .status(500)
      .json({ message: "Error al crear usuario", error: error.message });
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
      .json({ message: "Error al obtener un usuario", error: error.message });
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
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userService.loginUser(email, password);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    return res.status(200).json(user);
  } catch (error) {
    // console.error("Error logging in:", error);
    return res
      .status(500)
      .json({ message: "Error al iniciar sesión", error: error.message });
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
      .json({ message: "Error al agregar amigo", error: error.message });
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
      .json({ message: "Error al obtener amigos", error: error.message });
  }
};
const updateTrainingCounter = async (req, res) => {
  const userId = req.params.id;
  try {
    const updatedUser = await userService.updateTrainingCounter(userId);
    return res.status(200).json(updatedUser);
  } catch (error) {
    // console.error("Error updating training counter:", error);
    return res.status(500).json({
      message: "Error al actualizar contador de entrenamiento",
      error: error.message,
    });
  }
};

const updateKilometers = async (req, res) => {
  const userId = req.params.id;
  const { kilometers } = req.body;
  try {
    const updatedUser = await userService.updateKilometers(userId, kilometers);
    return res.status(200).json(updatedUser);
  } catch (error) {
    // console.error("Error updating kilometres:", error);
    return res.status(500).json({
      message: "Error al actualizar kilómetros",
      error: error.message,
    });
  }
};

const updateBestRythm = async (req, res) => {
  const userId = req.params.id;
  const { best_rhythm } = req.body;
  try {
    const updatedUser = await userService.updateBestRythm(userId, best_rhythm);
    return res.status(200).json(updatedUser);
  } catch (error) {
    // console.error("Error updating best rhythm:", error);
    return res.status(500).json({
      message: "Error al actualizar mejor ritmo",
      error: error.message,
    });
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
      .json({ message: "Error al agregar evento", error: error.message });
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
      .json({ message: "Error al obtener eventos", error: error.message });
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
      .json({ message: "Error al obtener evento", error: error.message });
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
        error: error.message,
      });
  }
};

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
};
