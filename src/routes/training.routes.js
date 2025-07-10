const express = require("express")

const router = express.Router()

const trainingController = require("../controllers/training.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const validate = require("../middlewares/validation.middleware")
const {trainingSchema} = require("../validation/trainings.validation")

/**
 * @swagger
 * components:
 *   schemas:
 *     Training:
 *       type: object
 *       required:
 *         - time_minutes
 *         - distance_km
 *         - rhythm
 *         - date
 *         - altitude
 *         - trainingType
 *         - terrainType
 *         - weather
 *       properties:
 *         time_minutes:
 *           type: number
 *           minimum: 1
 *           maximum: 1440
 *           description: Tiempo del entrenamiento en minutos
 *         distance_km:
 *           type: number
 *           minimum: 0.1
 *           maximum: 100
 *           description: Distancia recorrida en kilómetros
 *         rhythm:
 *           type: number
 *           minimum: 2
 *           maximum: 20
 *           description: Ritmo en minutos por kilómetro
 *         date:
 *           type: string
 *           format: date
 *           description: Fecha del entrenamiento
 *         altitude:
 *           type: number
 *           minimum: -500
 *           maximum: 9000
 *           description: Altitud en metros
 *         notes:
 *           type: string
 *           maxLength: 1000
 *           description: Notas adicionales del entrenamiento
 *         trainingType:
 *           type: string
 *           enum: [Easy Run, Hard Run, Intervalos, Tempo Run, Recuperación, Long Run, Técnica de Carrera, Subidas, Fartlek, Descanso Activo]
 *           description: Tipo de entrenamiento
 *         terrainType:
 *           type: string
 *           enum: [Asfalto, Tierra, Césped, Arena, Pista (Tartán), Sendero, Montaña, Cemento]
 *           description: Tipo de terreno
 *         weather:
 *           type: string
 *           enum: [Soleado, Nublado, Lluvioso, Ventoso, Nevado, Húmedo, Seco, Tormenta]
 *           description: Condiciones climáticas
 *     TrainingResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: ID del entrenamiento
 *         user_id:
 *           type: number
 *           description: ID del usuario
 *         time_minutes:
 *           type: number
 *         distance_km:
 *           type: number
 *         rhythm:
 *           type: number
 *         date:
 *           type: string
 *           format: date
 *         altitude:
 *           type: number
 *         notes:
 *           type: string
 *         trainingType:
 *           type: string
 *         terrainType:
 *           type: string
 *         weather:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *     WeeklyTraining:
 *       type: object
 *       properties:
 *         week_start:
 *           type: string
 *           format: date
 *           description: Inicio de la semana
 *         week_end:
 *           type: string
 *           format: date
 *           description: Fin de la semana
 *         total_distance:
 *           type: number
 *           description: Distancia total de la semana
 *         total_time:
 *           type: number
 *           description: Tiempo total de la semana
 *         average_rhythm:
 *           type: number
 *           description: Ritmo promedio de la semana
 *         trainings:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/TrainingResponse'
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
 *   name: Trainings
 *   description: Operaciones relacionadas con entrenamientos
 */

/**
 * @swagger
 * /trainings:
 *   post:
 *     summary: Crear un nuevo entrenamiento
 *     tags: [Trainings]
 *     security:
 *       - TokenAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Training'
 *     responses:
 *       201:
 *         description: Entrenamiento creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito
 *                   example: "Entrenamiento creado correctamente"
 *                 newBadges:
 *                   type: array
 *                   description: Lista de nuevas insignias obtenidas
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                         description: ID de la insignia
 *                         example: 5
 *                       name:
 *                         type: string
 *                         description: Nombre de la insignia
 *                         example: "Maratón Virtual"
 *                       description:
 *                         type: string
 *                         description: Descripción de la insignia
 *                         example: "Corre 42 km acumulados en una semana."
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
 *         description: Error al crear entrenamiento
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/",authMiddleware, validate(trainingSchema) ,trainingController.createTraining)

/**
 * @swagger
 * /trainings/{id}:
 *   get:
 *     summary: Obtener entrenamiento por ID
 *     tags: [Trainings]
 *     security:
 *       - TokenAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del entrenamiento a obtener
 *     responses:
 *       200:
 *         description: Entrenamiento obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito
 *                   example: "Training retrieved successfully"
 *                 training:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       description: ID del entrenamiento
 *                       example: 28
 *                     time_minutes:
 *                       type: number
 *                       description: Tiempo del entrenamiento en minutos
 *                       example: 22
 *                     distance_km:
 *                       type: number
 *                       description: Distancia recorrida en kilómetros
 *                       example: 3.5
 *                     rhythm:
 *                       type: number
 *                       description: Ritmo en minutos por kilómetro
 *                       example: 4.4
 *                     date:
 *                       type: string
 *                       format: date
 *                       description: Fecha del entrenamiento
 *                       example: "2025-07-07T00:00:00.000Z"
 *                     altitude:
 *                       type: number
 *                       description: Altitud en metros
 *                       example: -301
 *                     notes:
 *                       type: string
 *                       description: Notas adicionales del entrenamiento
 *                       example: ""
 *                     trainingType:
 *                       type: string
 *                       description: Tipo de entrenamiento
 *                       example: "Easy Run"
 *                     terrainType:
 *                       type: string
 *                       description: Tipo de terreno
 *                       example: "Asfalto"
 *                     weather:
 *                       type: string
 *                       description: Condiciones climáticas
 *                       example: "Nevado"
 *                     id_user:
 *                       type: number
 *                       description: ID del usuario propietario del entrenamiento
 *                       example: 1
 *                 success:
 *                   type: boolean
 *                   description: Indica si la operación fue exitosa
 *                   example: true
 *       400:
 *         description: ID de entrenamiento requerido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error al obtener entrenamiento
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", authMiddleware, trainingController.getTrainingById)

/**
 * @swagger
 * /trainings/user/{id}:
 *   get:
 *     summary: Obtener todos los entrenamientos de un usuario
 *     tags: [Trainings]
 *     security:
 *       - TokenAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario cuyos entrenamientos se quieren obtener
 *     responses:
 *       200:
 *         description: Lista de entrenamientos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito
 *                   example: "All trainings retrieved successfully"
 *                 trainings:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                         description: ID del entrenamiento
 *                         example: 28
 *                       time_minutes:
 *                         type: number
 *                         description: Tiempo del entrenamiento en minutos
 *                         example: 22
 *                       distance_km:
 *                         type: number
 *                         description: Distancia recorrida en kilómetros
 *                         example: 3.5
 *                       rhythm:
 *                         type: number
 *                         description: Ritmo en minutos por kilómetro
 *                         example: 4.4
 *                       date:
 *                         type: string
 *                         format: date
 *                         description: Fecha del entrenamiento
 *                         example: "2025-07-07T00:00:00.000Z"
 *                       altitude:
 *                         type: number
 *                         description: Altitud en metros
 *                         example: -301
 *                       notes:
 *                         type: string
 *                         description: Notas adicionales del entrenamiento
 *                         example: "Entrenamiento con buen ritmo en terreno mixto."
 *                       trainingType:
 *                         type: string
 *                         description: Tipo de entrenamiento
 *                         example: "Easy Run"
 *                       terrainType:
 *                         type: string
 *                         description: Tipo de terreno
 *                         example: "Asfalto"
 *                       weather:
 *                         type: string
 *                         description: Condiciones climáticas
 *                         example: "Nevado"
 *                 success:
 *                   type: boolean
 *                   description: Indica si la operación fue exitosa
 *                   example: true
 *       400:
 *         description: ID de usuario requerido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error al obtener entrenamientos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/user/:id", authMiddleware, trainingController.getTrainingsByUserId)

/**
 * @swagger
 * /trainings/weekly-distance/{id}:
 *   get:
 *     summary: Obtener entrenamientos semanales de un usuario
 *     tags: [Trainings]
 *     security:
 *       - TokenAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario cuyos entrenamientos semanales se quieren obtener
 *     responses:
 *       200:
 *         description: Entrenamientos semanales obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito
 *                   example: "Weekly distance retrieved successfully"
 *                 totalKm:
 *                   type: number
 *                   description: Total de kilómetros recorridos en la semana
 *                   example: 18.5
 *                 totalTrainings:
 *                   type: number
 *                   description: Total de entrenamientos realizados en la semana
 *                   example: 4
 *                 avgRhythm:
 *                   type: number
 *                   description: Ritmo promedio de la semana en minutos por kilómetro
 *                   example: 4.45
 *                 success:
 *                   type: boolean
 *                   description: Indica si la operación fue exitosa
 *                   example: true
 *       400:
 *         description: ID de usuario requerido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error al obtener entrenamientos semanales
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/weekly-distance/:id", authMiddleware, trainingController.getWeeklyTrainingsByUserId)

module.exports = router;