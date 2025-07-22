module.exports = {
  // USER ROUTES
  registerLimiter: {
    windowMs: 30 * 60 * 1000, // 30 minutos
    max: 5,
    message: "Demasiados registros desde esta IP, intenta más tarde.",
    keyType: "ip"
  },
  loginLimiter: {
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5, // Puedes subir a 10 si lo prefieres
    message: "Demasiados intentos de login, intenta más tarde.",
    keyType: "ip"
  },
  updateUserLimiter: {
    windowMs: 10 * 60 * 1000, // 10 minutos
    max: 10,
    message: "Demasiadas actualizaciones de usuario, espera un momento.",
    keyType: "user"
  },
  addFriendLimiter: {
    windowMs: 10 * 60 * 1000, // 10 minutos
    max: 10,
    message: "Demasiadas solicitudes para agregar amigos, espera un momento.",
    keyType: "user"
  },
  getFriendsLimiter: {
    windowMs: 10 * 60 * 1000, // 10 minutos
    max: 30,
    message: "Demasiadas consultas de amigos, espera un momento.",
    keyType: "user"
  },
  addEventLimiter: {
    windowMs: 30 * 60 * 1000, // 30 minutos
    max: 5,
    message: "Demasiados eventos agregados, espera un momento.",
    keyType: "user"
  },
  getEventsLimiter: {
    windowMs: 10 * 60 * 1000, // 10 minutos
    max: 40,
    message: "Demasiadas consultas de eventos, espera un momento.",
    keyType: "user"
  },
  getBadgesLimiter: {
    windowMs: 10 * 60 * 1000, // 10 minutos
    max: 40,
    message: "Demasiadas consultas de insignias, espera un momento.",
    keyType: "user"
  },

  // CHATBOT ROUTES
  classifyLimiter: {
    windowMs: 5 * 60 * 1000, // 5 minutos
    max: 20,
    message: "Demasiadas preguntas al chatbot, espera un momento.",
    keyType: "user"
  },
  getStatsLimiter: {
    windowMs: 10 * 60 * 1000, // 10 minutos
    max: 40,
    message: "Demasiadas consultas de estadísticas, espera un momento.",
    keyType: "user"
  },
  getStatsWeeklyLimiter: {
    windowMs: 10 * 60 * 1000, // 10 minutos
    max: 40,
    message: "Demasiadas consultas de estadísticas semanales, espera un momento.",
    keyType: "user"
  },
  getCategoriesLimiter: {
    windowMs: 10 * 60 * 1000, // 10 minutos
    max: 60,
    message: "Demasiadas consultas de categorías, espera un momento.",
    keyType: "user" // Puedes cambiar a "ip" si la ruta es pública
  },

  // TRAINING ROUTES
  createTrainingLimiter: {
    windowMs: 60 * 60 * 1000, // 1 hora
    max: 10,
    message: "Demasiados entrenamientos creados, espera un momento.",
    keyType: "user"
  },
  getTrainingByIdLimiter: {
    windowMs: 10 * 60 * 1000, // 10 minutos
    max: 60,
    message: "Demasiadas consultas de entrenamientos, espera un momento.",
    keyType: "user"
  },
  getTrainingsByUserLimiter: {
    windowMs: 10 * 60 * 1000, // 10 minutos
    max: 30,
    message: "Demasiadas consultas de entrenamientos de usuario, espera un momento.",
    keyType: "user"
  },
  getWeeklyTrainingsLimiter: {
    windowMs: 10 * 60 * 1000, // 10 minutos
    max: 30,
    message: "Demasiadas consultas de entrenamientos semanales, espera un momento.",
    keyType: "user"
  },

  // GLOBAL
  generalLimiter: {
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 200,
    message: "Demasiadas peticiones, espera un momento.",
    keyType: "ip"
  }
}; 