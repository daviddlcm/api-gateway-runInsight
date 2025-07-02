const express = require("express")

const router = express.Router()

const userController = require("../controllers/user.cotroller")

router.post("/", userController.createUser)

router.get("/:id", userController.getUserById)

router.patch("/:id", userController.updateUser)

router.post("/login", userController.loginUser)

router.post("/friends", userController.addFriend)

router.get("/friends/:id", userController.getAllMyFriends)

module.exports = router