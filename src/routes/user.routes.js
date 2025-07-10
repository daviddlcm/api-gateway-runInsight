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

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - gender
 *         - birthdate
 *         - username
 *         - user_stats
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre completo del usuario
 *         email:
 *           type: string
 *           format: email
 *           description: Email del usuario
 *         password:
 *           type: string
 *           minLength: 8
 *           description: Contraseña del usuario
 *         gender:
 *           type: string
 *           enum: [Masculino, Femenino, No binario, Otro, Prefiero no decirlo]
 *           description: Género del usuario
 *         birthdate:
 *           type: string
 *           format: date
 *           description: Fecha de nacimiento
 *         username:
 *           type: string
 *           description: Nombre de usuario único
 *         user_stats:
 *           type: object
 *           required:
 *             - exp_level
 *             - weight
 *             - height
 *           properties:
 *             exp_level:
 *               type: string
 *               enum: [Principiante, Intermedio, Avanzado, Experto, Maestro]
 *               description: Nivel de experiencia del usuario
 *             weight:
 *               type: number
 *               minimum: 0
 *               description: Peso en kg
 *             height:
 *               type: number
 *               minimum: 0
 *               description: Altura en cm
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: Email o Username del usuario
 *         password:
 *           type: string
 *           description: Contraseña del usuario
 *     UpdateUserStats:
 *       type: object
 *       required:
 *         - weight
 *         - height
 *         - experience
 *       properties:
 *         weight:
 *           type: number
 *           minimum: 0
 *           description: Nuevo peso en kg
 *         height:
 *           type: number
 *           minimum: 0
 *           description: Nueva altura en cm
 *         experience:
 *            type: string
 *            enum: [Principiante, Intermedio, Avanzado, Experto, Maestro]
 *            description: Nivel de experiencia del usuario
 *     AddFriend:
 *       type: object
 *       required:
 *         - userId
 *         - friendId
 *       properties:
 *         userId:
 *           type: number
 *           description: ID del usuario que agrega al amigo
 *         friendId:
 *           type: number
 *           description: ID del usuario a agregar como amigo
 *     Event:
 *       type: object
 *       required:
 *         - date_event
 *         - file
 *       properties:
 *         date_event:
 *           type: string
 *           format: date
 *           description: Fecha del evento
 *         file:
 *           type: string
 *           format: binary
 *           description: Archivo del evento
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Mensaje de error
 *         error:
 *           type: string
 *           description: Detalles del error
 *   securitySchemes:
 *     TokenAuth:
 *       type: apiKey
 *       in: header
 *       name: token
 *       description: Token de autenticación JWT
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operaciones relacionadas con usuarios
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Error al crear usuario
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/", validate(createUserSchema), userController.createUser);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtener usuario por ID
 *     tags: [Users]
 *     security:
 *       - TokenAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a obtener
 *     responses:
 *       200:
 *         description: Usuario obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito
 *                   example: "User found"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       description: ID del usuario
 *                       example: 2
 *                     name:
 *                       type: string
 *                       description: Nombre del usuario
 *                       example: "david"
 *                     email:
 *                       type: string
 *                       format: email
 *                       description: Email del usuario
 *                       example: "david12@gmail.com"
 *                     username:
 *                       type: string
 *                       description: Nombre de usuario
 *                       example: "david12"
 *                     birthdate:
 *                       type: string
 *                       format: date-time
 *                       description: Fecha de nacimiento
 *                       example: "2004-10-04T00:00:00.000Z"
 *                     gender:
 *                       type: string
 *                       description: Género del usuario
 *                       example: "Masculino"
 *                     stats:
 *                       type: object
 *                       properties:
 *                         exp_level:
 *                           type: string
 *                           description: Nivel de experiencia
 *                           example: "Principiante"
 *                         weight:
 *                           type: number
 *                           description: Peso en kg
 *                           example: 100.5
 *                         height:
 *                           type: number
 *                           description: Altura en cm
 *                           example: 190
 *                         km_total:
 *                           type: number
 *                           description: Kilómetros totales recorridos
 *                           example: 0
 *                         best_rhythm:
 *                           type: number
 *                           description: Mejor ritmo alcanzado
 *                           example: 0
 *                         training_counter:
 *                           type: number
 *                           description: Contador de entrenamientos
 *                           example: 0
 *                         training_streak:
 *                           type: number
 *                           description: Racha de entrenamientos
 *                           example: 0
 *                 success:
 *                   type: boolean
 *                   description: Indica si la operación fue exitosa
 *                   example: true
 *       500:
 *         description: Error al obtener usuario
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", authMiddleware, userController.getUserById);

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Actualizar estadísticas del usuario
 *     tags: [Users]
 *     security:
 *       - TokenAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserStats'
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito
 *                   example: "User updated successfully"
 *                 success:
 *                   type: boolean
 *                   description: Indica si la operación fue exitosa
 *                   example: true
 *       500:
 *         description: Error al actualizar usuario
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.patch(
  "/:id",
  authMiddleware,
  validate(updateUserStatsSchema),
  userController.updateUser
);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito
 *                   example: "User logged in successfully"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       description: ID del usuario
 *                       example: 1
 *                     token:
 *                       type: string
 *                       description: Token de autenticación JWT
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzUyMDk4NDQzLCJleHAiOjE3NTIxODQ4NDN9.g_jlClo0IBX1at-QMRp_AAwMaifF-P-0v4BiSIDMfYQ"
 *                     rolesId:
 *                       type: number
 *                       description: ID del rol del usuario
 *                       example: 2
 *                 success:
 *                   type: boolean
 *                   description: Indica si la operación fue exitosa
 *                   example: true
 *       500:
 *         description: Error al iniciar sesión
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/login", validate(loginSchema), userController.loginUser);

/**
 * @swagger
 * /users/friends:
 *   post:
 *     summary: Agregar amigo
 *     tags: [Users]
 *     security:
 *       - TokenAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddFriend'
 *     responses:
 *       200:
 *         description: Amigo agregado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito
 *                   example: "Friend added successfully"
 *                 success:
 *                   type: boolean
 *                   description: Indica si la operación fue exitosa
 *                   example: true
 *       500:
 *         description: Error al agregar amigo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post(
  "/friends",
  authMiddleware,
  validate(addFriendSchema),
  userController.addFriend
);

/**
 * @swagger
 * /users/friends/{id}:
 *   get:
 *     summary: Obtener todos los amigos de un usuario
 *     tags: [Users]
 *     security:
 *       - TokenAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario cuyos amigos se quieren obtener
 *     responses:
 *       200:
 *         description: Lista de amigos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito
 *                   example: "Friends retrieved successfully"
 *                 friends:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                         description: ID del amigo
 *                         example: 2
 *                       username:
 *                         type: string
 *                         description: Nombre de usuario del amigo
 *                         example: "david12"
 *                       email:
 *                         type: string
 *                         format: email
 *                         description: Email del amigo
 *                         example: "david12@gmail.com"
 *                       stats:
 *                         type: object
 *                         properties:
 *                           km_total:
 *                             type: number
 *                             description: Kilómetros totales recorridos por el amigo
 *                             example: 0
 *                           training_counter:
 *                             type: number
 *                             description: Contador de entrenamientos del amigo
 *                             example: 0
 *                 success:
 *                   type: boolean
 *                   description: Indica si la operación fue exitosa
 *                   example: true
 *       500:
 *         description: Error al obtener amigos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/friends/:id", authMiddleware, userController.getAllMyFriends);

/**
 * @swagger
 * /users/event/{id}:
 *   post:
 *     summary: Agregar evento para un usuario
 *     tags: [Users]
 *     security:
 *       - TokenAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario para el cual se agrega el evento
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *               - date_event
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Archivo del evento
 *               date_event:
 *                 type: string
 *                 format: date
 *                 description: Fecha del evento
 *     responses:
 *       201:
 *         description: Evento agregado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 message:
 *                   type: string
 *       400:
 *         description: Datos faltantes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error al agregar evento
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post(
  "/event/:id",
  authMiddleware,
  fileUpload({ useTempFiles: true, tempFileDir: "./temp" }),
  userController.addEvent
);

/**
 * @swagger
 * /users/events/all:
 *   get:
 *     summary: Obtener todos los eventos
 *     tags: [Users]
 *     security:
 *       - TokenAuth: []
 *     responses:
 *       200:
 *         description: Lista de eventos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito
 *                   example: "Events fetched successfully"
 *                 events:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                         description: ID del evento
 *                         example: 1
 *                       id_user:
 *                         type: number
 *                         description: ID del usuario propietario del evento
 *                         example: 1
 *                       date_event:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha del evento
 *                         example: "2025-12-17T00:00:00.000Z"
 *                       img_path:
 *                         type: string
 *                         description: Ruta de la imagen del evento
 *                         example: "link img"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha de creación
 *                         example: "2025-12-17T00:00:00.000Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha de última actualización
 *                         example: "2025-12-17T00:00:00.000Z"
 *                 success:
 *                   type: boolean
 *                   description: Indica si la operación fue exitosa
 *                   example: true
 *       500:
 *         description: Error al obtener eventos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/events/all", authMiddleware, userController.getAllEvents);

/**
 * @swagger
 * /users/events/{id}:
 *   get:
 *     summary: Obtener evento por ID
 *     tags: [Users]
 *     security:
 *       - TokenAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del evento a obtener
 *     responses:
 *       200:
 *         description: Evento obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito
 *                   example: "Event fetched successfully"
 *                 event:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       description: ID del evento
 *                       example: 1
 *                     id_user:
 *                       type: number
 *                       description: ID del usuario propietario del evento
 *                       example: 1
 *                     date_event:
 *                       type: string
 *                       format: date-time
 *                       description: Fecha del evento
 *                       example: "2025-12-17T00:00:00.000Z"
 *                     img_path:
 *                       type: string
 *                       description: Ruta de la imagen del evento
 *                       example: "link img"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: Fecha de creación
 *                       example: "2025-12-17T00:00:00.000Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: Fecha de última actualización
 *                       example: "2025-12-17T00:00:00.000Z"
 *                 success:
 *                   type: boolean
 *                   description: Indica si la operación fue exitosa
 *                   example: true
 *       500:
 *         description: Error al obtener evento
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/events/:id", authMiddleware, userController.getEventById);

/**
 * @swagger
 * /users/events/by/future:
 *   get:
 *     summary: Obtener eventos futuros
 *     tags: [Users]
 *     security:
 *       - TokenAuth: []
 *     parameters:
 *       - in: query
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha desde la cual obtener eventos futuros
 *     responses:
 *       200:
 *         description: Lista de eventos futuros obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito
 *                   example: "Future events fetched successfully"
 *                 events:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                         description: ID del evento
 *                         example: 1
 *                       id_user:
 *                         type: number
 *                         description: ID del usuario propietario del evento
 *                         example: 1
 *                       date_event:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha del evento
 *                         example: "2025-12-17T00:00:00.000Z"
 *                       img_path:
 *                         type: string
 *                         description: Ruta de la imagen del evento
 *                         example: "link img"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha de creación
 *                         example: "2025-12-17T00:00:00.000Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha de última actualización
 *                         example: "2025-12-17T00:00:00.000Z"
 *                 success:
 *                   type: boolean
 *                   description: Indica si la operación fue exitosa
 *                   example: true
 *       500:
 *         description: Error al obtener eventos futuros
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/events/by/future", authMiddleware, userController.getEventFuture);

/**
 * @swagger
 * /users/badges/all:
 *   get:
 *     summary: Obtener todas las insignias
 *     tags: [Users]
 *     security:
 *       - TokenAuth: []
 *     responses:
 *       200:
 *         description: Lista de insignias obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la operación fue exitosa
 *                   example: true
 *                 badges:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                         description: ID de la insignia
 *                         example: 1
 *                       name:
 *                         type: string
 *                         description: Nombre de la insignia
 *                         example: "5K Explorer"
 *                       description:
 *                         type: string
 *                         description: Descripción de la insignia
 *                         example: "Corre al menos 5 km en una semana."
 *                       url_icon:
 *                         type: string
 *                         description: URL del ícono de la insignia
 *                         example: "https://res.cloudinary.com/dpz2wx43s/image/upload/v1751575435/badges/medalla_gpdasb.png"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha de creación
 *                         example: "2025-07-07T19:19:44.000Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha de última actualización
 *                         example: "2025-07-07T19:19:44.000Z"
 *       500:
 *         description: Error al obtener insignias
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/badges/all", authMiddleware, userController.getAllBadges);

/**
 * @swagger
 * /users/badges/{id}:
 *   get:
 *     summary: Obtener insignia por ID
 *     tags: [Users]
 *     security:
 *       - TokenAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la insignia a obtener
 *     responses:
 *       200:
 *         description: Insignia obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la operación fue exitosa
 *                   example: true
 *                 badge:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       description: ID de la insignia
 *                       example: 1
 *                     name:
 *                       type: string
 *                       description: Nombre de la insignia
 *                       example: "5K Explorer"
 *                     description:
 *                       type: string
 *                       description: Descripción de la insignia
 *                       example: "Corre al menos 5 km en una semana."
 *                     url_icon:
 *                       type: string
 *                       description: URL del ícono de la insignia
 *                       example: "https://res.cloudinary.com/dpz2wx43s/image/upload/v1751575435/badges/medalla_gpdasb.png"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: Fecha de creación
 *                       example: "2025-07-07T19:19:44.000Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: Fecha de última actualización
 *                       example: "2025-07-07T19:19:44.000Z"
 *       500:
 *         description: Error al obtener insignia
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/badges/:id", authMiddleware, userController.getBadgeById);

/**
 * @swagger
 * /users/badges/user/{id}:
 *   get:
 *     summary: Obtener insignias de un usuario específico
 *     tags: [Users]
 *     security:
 *       - TokenAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario cuyas insignias se quieren obtener
 *     responses:
 *       200:
 *         description: Lista de insignias del usuario obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la operación fue exitosa
 *                   example: true
 *                 badges:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                         description: ID de la insignia
 *                         example: 1
 *                       name:
 *                         type: string
 *                         description: Nombre de la insignia
 *                         example: "5K Explorer"
 *                       description:
 *                         type: string
 *                         description: Descripción de la insignia
 *                         example: "Corre al menos 5 km en una semana."
 *                       url_icon:
 *                         type: string
 *                         description: URL del ícono de la insignia
 *                         example: "https://res.cloudinary.com/dpz2wx43s/image/upload/v1751575435/badges/medalla_gpdasb.png"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha de creación
 *                         example: "2025-07-07T19:19:44.000Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha de última actualización
 *                         example: "2025-07-07T19:19:44.000Z"
 *       500:
 *         description: Error al obtener insignias del usuario
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get(
  "/badges/user/:id",
  authMiddleware,
  userController.getBadgesByUserId
);

//router.post("/badges/user",authMiddleware,  validate(addBadgeToUserSchema), userController.addBadgeToUser);

module.exports = router;
