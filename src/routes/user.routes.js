const express = require("express");
const validate = require("../middlewares/validation.middleware");
const {
  createUserSchema,
  loginSchema,
  updateUserStatsSchema,
  addBadgeToUserSchema,
  addFriendSchema,
} = require("../validation/user.validation");

const router = express.Router();

const userController = require("../controllers/user.cotroller");
const authMiddleware = require("../middlewares/auth.middleware");
const fileUpload = require("express-fileupload");

router.post("/", validate(createUserSchema), userController.createUser);

router.get("/:id", authMiddleware, userController.getUserById);

router.patch("/:id",authMiddleware,  validate(updateUserStatsSchema),userController.updateUser);

router.post("/login", validate(loginSchema), userController.loginUser);

router.post("/friends", authMiddleware, validate(addFriendSchema) ,userController.addFriend);

router.get("/friends/:id", authMiddleware, userController.getAllMyFriends);

router.patch(
  "/training/:id",
  authMiddleware,
  userController.updateTrainingCounter
);

router.patch(
  "/kilometres/:id",
  authMiddleware,
  userController.updateKilometers
);

router.patch(
  "/best-rhythm/:id",
  authMiddleware,
  userController.updateBestRythm
);

router.post(
  "/event/:id",
  authMiddleware,
  fileUpload({ useTempFiles: true, tempFileDir: "./temp" }),
  userController.addEvent
);

router.get("/events/all", authMiddleware, userController.getAllEvents);

router.get("/events/:id", authMiddleware, userController.getEventById);

router.get("/events/by/future", authMiddleware, userController.getEventFuture);

router.get("/badges/all", authMiddleware, userController.getAllBadges);

router.get("/badges/:id", authMiddleware, userController.getBadgeById);

router.get(
  "/badges/user/:id",
  authMiddleware,
  userController.getBadgesByUserId
);

router.post("/badges/user",authMiddleware,  validate(addBadgeToUserSchema), userController.addBadgeToUser);

module.exports = router;
