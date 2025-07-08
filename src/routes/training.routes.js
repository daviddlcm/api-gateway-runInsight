const express = require("express")

const router = express.Router()

const trainingController = require("../controllers/training.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const validate = require("../middlewares/validation.middleware")
const {trainingSchema} = require("../validation/trainings.validation")


router.get("/weekly-distance/:id", authMiddleware, trainingController.getWeeklyTrainingsByUserId)
router.get("/user/:id", authMiddleware, trainingController.getTrainingsByUserId)
router.post("/",authMiddleware, validate(trainingSchema) ,trainingController.createTraining)
router.get("/:id", authMiddleware, trainingController.getTrainingById)


module.exports = router;