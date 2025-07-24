const express = require("express")

const router = express.Router()

const engagementController = require("../controllers/engagement.controller")
const authMiddleware = require("../middlewares/auth.middleware")

/**
 * @swagger
 * /engagement:
 *   post:
 *     summary: Crear un nuevo engagement log
 *     tags: [EngagementLogs]
 *     security:
 *       - TokenAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - view_id
 *               - duration_seconds
 *             properties:
 *               view_id:
 *                 type: integer
 *                 description: ID de la vista
 *               duration_seconds:
 *                 type: integer
 *                 description: Duración en segundos
 *               viewed_at:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha y hora de la vista
 *     responses:
 *       201:
 *         description: Engagement log creado
 *       400:
 *         description: Error de validación
 */
router.post("/", authMiddleware ,engagementController.createLog)

/**
 * @swagger
 * /engagement:
 *   get:
 *     summary: Obtener todos los engagement logs
 *     tags: [EngagementLogs]
 *     security:
 *       - TokenAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Límite de resultados
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: Offset de resultados
 *     responses:
 *       200:
 *         description: Lista de engagement logs
 */
router.get("/", authMiddleware, engagementController.getAllEngagementLogs)

/**
 * @swagger
 * /engagement/{id}:
 *   get:
 *     summary: Obtener engagement logs de un usuario específico
 *     tags: [EngagementLogs]
 *     security:
 *       - TokenAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Límite de resultados
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: Offset de resultados
 *     responses:
 *       200:
 *         description: Lista de engagement logs del usuario
 */
router.get("/:id", authMiddleware, engagementController.getEngagementLogsByUserId)

/**
 * @swagger
 * /engagement/stats/{id}:
 *   get:
 *     summary: Obtener estadísticas de engagement de un usuario
 *     tags: [EngagementLogs]
 *     security:
 *       - TokenAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Estadísticas de engagement del usuario
 */
router.get("/stats/:id", authMiddleware, engagementController.getStatsByUserId)

/**
 * @swagger
 * /engagement/stats/by/views:
 *   get:
 *     summary: Obtener estadísticas de engagement por vista
 *     tags: [EngagementLogs]
 *     security:
 *       - TokenAuth: []
 *     responses:
 *       200:
 *         description: Estadísticas de engagement por vista
 */
router.get("/stats/by/views", authMiddleware, engagementController.getStatsByViews);

/**
 * @swagger
 * /engagement/analytics/{id}:
 *   get:
 *     summary: Obtener análisis detallado de engagement de un usuario
 *     tags: [EngagementLogs]
 *     security:
 *       - TokenAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *       - in: query
 *         name: days
 *         schema:
 *           type: integer
 *         description: Días a analizar (por defecto 30)
 *     responses:
 *       200:
 *         description: Análisis de engagement del usuario
 */
router.get("/analytics/:id", authMiddleware, engagementController.getAnalyticsByUserId)

module.exports = router