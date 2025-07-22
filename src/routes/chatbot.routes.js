const express = require("express");
const router = express.Router();

const chatbotController = require("../controllers/chatbot.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validation.middleware");
const { questionRequestSchema } = require("../validation/chatbot.validation");
const rateLimit = require("../middlewares/rate.limit.middleware");
const {
  classifyLimiter,
  getStatsLimiter,
  getStatsWeeklyLimiter,
  getCategoriesLimiter
} = require("../config/rate.limit.config");


/**
 * @swagger
 * components:
 *   schemas:
 *     QuestionRequest:
 *       type: object
 *       required:
 *         - question
 *       properties:
 *         question:
 *           type: string
 *           minLength: 3
 *           maxLength: 500
 *           description: Pregunta del usuario a clasificar
 *           example: "¿Qué debo comer antes de correr?"
 *     ClassificationResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indica si la clasificación fue exitosa
 *           example: true
 *         category:
 *           type: string
 *           enum: [nutricion, entrenamiento, recuperacion, prevencion, equipamiento]
 *           description: Categoría clasificada para la pregunta
 *           example: "nutricion"
 *         confidence:
 *           type: number
 *           minimum: 0
 *           maximum: 100
 *           description: Nivel de confianza de la clasificación (0-100)
 *           example: 85.5
 *         userStats:
 *           type: object
 *           properties:
 *             preguntas_nutricion:
 *               type: integer
 *               description: Total de preguntas sobre nutrición del usuario
 *               example: 5
 *             preguntas_entrenamiento:
 *               type: integer
 *               description: Total de preguntas sobre entrenamiento del usuario
 *               example: 12
 *             preguntas_recuperacion:
 *               type: integer
 *               description: Total de preguntas sobre recuperación del usuario
 *               example: 3
 *             preguntas_prevencion_lesiones:
 *               type: integer
 *               description: Total de preguntas sobre prevención de lesiones del usuario
 *               example: 2
 *             preguntas_equipamiento:
 *               type: integer
 *               description: Total de preguntas sobre equipamiento del usuario
 *               example: 1
 *             score_ponderado:
 *               type: number
 *               description: Puntuación ponderada del usuario
 *               example: 45.5
 *             ultima_actualizacion:
 *               type: string
 *               format: date-time
 *               description: Fecha de última actualización de estadísticas
 *               example: "2024-01-15T10:30:00.000Z"
 *         timestamp:
 *           type: string
 *           format: date-time
 *           description: Timestamp de la clasificación
 *           example: "2024-01-15T10:30:00.000Z"
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indica si la operación fue exitosa
 *           example: false
 *         error:
 *           type: string
 *           description: Mensaje de error principal
 *           example: "Error al clasificar la pregunta"
 *         message:
 *           type: string
 *           description: Mensaje adicional de error
 *           example: "Error interno del servidor"
 *         details:
 *           type: array
 *           items:
 *             type: string
 *           description: Lista de errores específicos
 *           example: ["La pregunta debe tener al menos 3 caracteres", "El ID de usuario debe ser un número entero positivo"]
 *     UserStatsResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indica si la operación fue exitosa
 *           example: true
 *         stats:
 *           type: object
 *           properties:
 *             userId:
 *               type: integer
 *               description: ID del usuario
 *               example: 123
 *             preguntas_nutricion:
 *               type: integer
 *               description: Total de preguntas sobre nutrición
 *               example: 5
 *             preguntas_entrenamiento:
 *               type: integer
 *               description: Total de preguntas sobre entrenamiento
 *               example: 12
 *             preguntas_recuperacion:
 *               type: integer
 *               description: Total de preguntas sobre recuperación
 *               example: 3
 *             preguntas_prevencion_lesiones:
 *               type: integer
 *               description: Total de preguntas sobre prevención de lesiones
 *               example: 2
 *             preguntas_equipamiento:
 *               type: integer
 *               description: Total de preguntas sobre equipamiento
 *               example: 1
 *             score_ponderado:
 *               type: number
 *               description: Puntuación ponderada del usuario
 *               example: 45.5
 *             ultima_actualizacion:
 *               type: string
 *               format: date-time
 *               description: Fecha de última actualización de estadísticas
 *               example: "2024-01-15T10:30:00.000Z"
 *     WeeklyStatsResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indica si la operación fue exitosa
 *           example: true
 *         period:
 *           type: object
 *           properties:
 *             startDate:
 *               type: string
 *               format: date
 *               description: Fecha de inicio del período
 *               example: "2024-01-10"
 *             endDate:
 *               type: string
 *               format: date
 *               description: Fecha de fin del período
 *               example: "2024-01-17"
 *             days:
 *               type: integer
 *               description: Número de días del período
 *               example: 7
 *         stats:
 *           type: object
 *           properties:
 *             preguntas_nutricion:
 *               type: integer
 *               description: Total de preguntas sobre nutrición en el período
 *               example: 3
 *             preguntas_entrenamiento:
 *               type: integer
 *               description: Total de preguntas sobre entrenamiento en el período
 *               example: 8
 *             preguntas_recuperacion:
 *               type: integer
 *               description: Total de preguntas sobre recuperación en el período
 *               example: 2
 *             preguntas_prevencion_lesiones:
 *               type: integer
 *               description: Total de preguntas sobre prevención de lesiones en el período
 *               example: 1
 *             preguntas_equipamiento:
 *               type: integer
 *               description: Total de preguntas sobre equipamiento en el período
 *               example: 0
 *             score_ponderado:
 *               type: number
 *               format: float
 *               description: Puntuación ponderada del período
 *               example: 32.0
 *             total_preguntas:
 *               type: integer
 *               description: Total de preguntas realizadas en el período
 *               example: 14
 *     CategoriesResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indica si la operación fue exitosa
 *           example: true
 *         categories:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la categoría
 *                 example: "entrenamiento"
 *               weight:
 *                 type: integer
 *                 description: Peso de la categoría para el cálculo del score
 *                 example: 3
 *               description:
 *                 type: string
 *                 description: Descripción detallada de la categoría
 *                 example: "Preguntas sobre rutinas, ejercicios, técnicas"
 */

/**
 * @swagger
 * tags:
 *   name: Chatbot
 *   description: Operaciones relacionadas con el chatbot de fitness y clasificación de preguntas
 */

/**
 * @swagger
 * /chatbot/text-mining/classify:
 *   post:
 *     summary: Clasifica una pregunta del usuario en categorías de fitness
 *     description: |
 *       Analiza una pregunta usando algoritmos de minería de texto y la clasifica en una de las 5 categorías:
 *       - **nutricion**: Preguntas sobre alimentación, suplementos, hidratación
 *       - **entrenamiento**: Preguntas sobre ejercicios, rutinas, técnicas
 *       - **recuperacion**: Preguntas sobre descanso, estiramientos, recuperación
 *       - **prevencion**: Preguntas sobre prevención de lesiones, fortalecimiento
 *       - **equipamiento**: Preguntas sobre ropa, calzado, tecnología deportiva
 *       
 *       La pregunta se guarda automáticamente en la base de datos y se actualizan las estadísticas del usuario.
 *     tags: [Chatbot]
 *     security:
 *       - TokenAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/QuestionRequest'
 *           examples:
 *             nutricion:
 *               summary: Pregunta sobre nutrición
 *               value:
 *                 question: "¿Qué debo comer antes de correr?"
 *             entrenamiento:
 *               summary: Pregunta sobre entrenamiento
 *               value:
 *                 question: "¿Cómo mejorar mi resistencia?"
 *             recuperacion:
 *               summary: Pregunta sobre recuperación
 *               value:
 *                 question: "¿Cómo estirar después del ejercicio?"
 *             equipamiento:
 *               summary: Pregunta sobre equipamiento
 *               value:
 *                 question: "¿Qué zapatillas debo usar?"
 *     responses:
 *       200:
 *         description: Pregunta clasificada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClassificationResponse'
 *             examples:
 *               nutricion:
 *                 summary: Respuesta para pregunta de nutrición
 *                 value:
 *                   success: true
 *                   category: "nutricion"
 *                   confidence: 85.5
 *                   userStats:
 *                     preguntas_nutricion: 5
 *                     preguntas_entrenamiento: 12
 *                     preguntas_recuperacion: 3
 *                     preguntas_prevencion_lesiones: 2
 *                     preguntas_equipamiento: 1
 *                     score_ponderado: 45.5
 *                     ultima_actualizacion: "2024-01-15T10:30:00.000Z"
 *                   timestamp: "2024-01-15T10:30:00.000Z"
 *       400:
 *         description: Datos de entrada inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Datos de entrada inválidos"
 *               details: [
 *                 "La pregunta debe tener al menos 3 caracteres",
 *                 "El ID de usuario debe ser un número entero positivo"
 *               ]
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Error al clasificar la pregunta"
 *               message: "Error interno del servidor"
 */
router.post("/text-mining/classify", authMiddleware, rateLimit(classifyLimiter), validate(questionRequestSchema), chatbotController.clasifyQuestion);

/**
 * @swagger
 * /chatbot/text-mining/stats/{userId}:
 *   get:
 *     summary: Obtiene las estadísticas de clasificación de un usuario
 *     description: |
 *       Retorna las estadísticas completas de un usuario, incluyendo:
 *       - Número de preguntas por categoría
 *       - Score ponderado basado en los pesos de cada categoría
 *       - Fecha de última actualización
 *       
 *       Las estadísticas se calculan en tiempo real desde la base de datos.
 *     tags: [Chatbot]
 *     security:
 *       - TokenAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID del usuario (referencia externa)
 *         example: 123
 *     responses:
 *       200:
 *         description: Estadísticas del usuario obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserStatsResponse'
 *             example:
 *               success: true
 *               stats:
 *                 userId: 123
 *                 preguntas_nutricion: 5
 *                 preguntas_entrenamiento: 12
 *                 preguntas_recuperacion: 3
 *                 preguntas_prevencion_lesiones: 2
 *                 preguntas_equipamiento: 1
 *                 score_ponderado: 45.5
 *                 ultima_actualizacion: "2024-01-15T10:30:00.000Z"
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Usuario no encontrado"
 *               message: "No se encontraron estadísticas para el usuario 999"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/text-mining/stats/:id", authMiddleware, rateLimit(getStatsLimiter), chatbotController.getStatsByUserId);

/**
 * @swagger
 * /chatbot/text-mining/stats/{userId}/weekly:
 *   get:
 *     summary: Obtiene las estadísticas de clasificación de un usuario de los últimos días
 *     description: |
 *       Retorna las estadísticas de un usuario para los últimos N días, incluyendo:
 *       - Número de preguntas por categoría en el período especificado
 *       - Score ponderado del período
 *       - Fecha de inicio y fin del período
 *       - Total de preguntas realizadas
 *       
 *       Las estadísticas se calculan en tiempo real desde la base de datos.
 *     tags: [Chatbot]
 *     security:
 *       - TokenAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID del usuario (referencia externa)
 *         example: 123
 *       - in: query
 *         name: days
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 30
 *           default: 7
 *         description: Número de días hacia atrás para calcular estadísticas (por defecto 7)
 *         example: 7
 *     responses:
 *       200:
 *         description: Estadísticas del usuario obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WeeklyStatsResponse'
 *             example:
 *               success: true
 *               period:
 *                 startDate: "2024-01-10"
 *                 endDate: "2024-01-17"
 *                 days: 7
 *               stats:
 *                 preguntas_nutricion: 3
 *                 preguntas_entrenamiento: 8
 *                 preguntas_recuperacion: 2
 *                 preguntas_prevencion_lesiones: 1
 *                 preguntas_equipamiento: 0
 *                 score_ponderado: 32.0
 *                 total_preguntas: 14
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/text-mining/stats/:id/weekly", authMiddleware, rateLimit(getStatsWeeklyLimiter), chatbotController.getStatsWeeklyByUserId);

/**
 * @swagger
 * /chatbot/text-mining/categories:
 *   get:
 *     summary: Obtiene las categorías disponibles y sus pesos
 *     description: |
 *       Retorna información sobre las 5 categorías disponibles para clasificación:
 *       
 *       | Categoría | Peso | Descripción |
 *       |-----------|------|-------------|
 *       | entrenamiento | 3 | Preguntas sobre rutinas, ejercicios, técnicas |
 *       | nutricion | 2 | Preguntas sobre alimentación, suplementos |
 *       | recuperacion | 2 | Preguntas sobre descanso, recuperación |
 *       | prevencion | 2 | Preguntas sobre prevención de lesiones |
 *       | equipamiento | 1 | Preguntas sobre ropa, calzado, tecnología |
 *       
 *       Los pesos se utilizan para calcular el score ponderado del usuario.
 *     tags: [Chatbot]
 *     security:
 *       - TokenAuth: []
 *     responses:
 *       200:
 *         description: Categorías obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoriesResponse'
 *             example:
 *               success: true
 *               categories: [
 *                 {
 *                   name: "entrenamiento",
 *                   weight: 3,
 *                   description: "Preguntas sobre rutinas, ejercicios, técnicas"
 *                 },
 *                 {
 *                   name: "nutricion",
 *                   weight: 2,
 *                   description: "Preguntas sobre alimentación, suplementos"
 *                 },
 *                 {
 *                   name: "recuperacion",
 *                   weight: 2,
 *                   description: "Preguntas sobre descanso, recuperación"
 *                 },
 *                 {
 *                   name: "prevencion",
 *                   weight: 2,
 *                   description: "Preguntas sobre prevención de lesiones"
 *                 },
 *                 {
 *                   name: "equipamiento",
 *                   weight: 1,
 *                   description: "Preguntas sobre ropa, calzado, tecnología"
 *                 }
 *               ]
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/text-mining/categories", authMiddleware, rateLimit(getCategoriesLimiter), chatbotController.getCategories);



module.exports = router;