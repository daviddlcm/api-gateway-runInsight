const express = require("express")

const router = express.Router()

const userController = require("../controllers/user.cotroller")
const authMiddleware = require("../middlewares/auth.middleware")
const fileUpload = require("express-fileupload")

router.post("/", userController.createUser)

router.get("/:id" , authMiddleware ,userController.getUserById)

router.patch("/:id", authMiddleware, userController.updateUser)

router.post("/login", userController.loginUser)

router.post("/friends", authMiddleware, userController.addFriend)

router.get("/friends/:id", authMiddleware, userController.getAllMyFriends)

router.patch("/training/:id" , authMiddleware,userController.updateTrainingCounter)

router.patch("/kilometres/:id", authMiddleware,userController.updateKilometers)

router.patch("/best-rhythm/:id", authMiddleware, userController.updateBestRythm)

router.post("/event/:id",authMiddleware,fileUpload({useTempFiles:true, tempFileDir:"./temp"}),userController.addEvent)

router.get("/events/all", authMiddleware, userController.getAllEvents)

router.get("/events/:id", authMiddleware, userController.getEventById)

router.get("/events/by/future", authMiddleware, userController.getEventFuture)

module.exports = router