const Joi = require("joi");

const validWeather = [
  "Soleado",
  "Nublado",
  "Lluvioso",
  "Ventoso",
  "Nevado",
  "Húmedo",
  "Seco",
  "Tormenta",
];

const validTerrainTypes = [
  "Asfalto",
  "Tierra",
  "Césped",
  "Arena",
  "Pista (Tartán)",
  "Sendero",
  "Montaña",
  "Cemento",
];

const validTrainingTypes = [
  "Easy Run",
  "Hard Run",
  "Intervalos",
  "Tempo Run",
  "Recuperación",
  "Long Run",
  "Técnica de Carrera",
  "Subidas",
  "Fartlek",
  "Descanso Activo",
];

const trainingSchema = Joi.object({
  time_minutes: Joi.number().min(1).max(1440).required().messages({
    "number.base": "El tiempo debe ser un número.",
    "number.min": "El tiempo mínimo debe ser 1 minuto.",
    "number.max": "El tiempo no puede superar las 24 horas.",
  }),

  distance_km: Joi.number().min(0.1).max(100).required().messages({
    "number.base": "La distancia debe ser un número.",
    "number.min": "La distancia debe ser mayor a 0.1 km.",
    "number.max": "La distancia no puede ser mayor a 100 km.",
  }),

  rhythm: Joi.number().min(2).max(20).required().messages({
    "number.base": "El ritmo debe ser un número.",
    "number.min": "El ritmo no puede ser menor a 2 min/km.",
    "number.max": "El ritmo no puede ser mayor a 20 min/km.",
  }),

  date: Joi.date().required().messages({
    "date.base": "La fecha debe ser válida.",
  }),

  altitude: Joi.number()
    .min(-500) 
    .max(9000)
    .required() 
    .messages({
      "number.base": "La altitud debe ser un número.",
      "number.min": "La altitud no puede ser menor a -500 m.",
      "number.max": "La altitud no puede ser mayor a 9000 m.",
    }),

  notes: Joi.string().max(1000).allow("").optional().messages({
    "string.base": "Las notas deben ser un texto.",
    "string.max": "Las notas no deben exceder los 1000 caracteres.",
  }),

  trainingType: Joi.string()
    .valid(...validTrainingTypes)
    .required()
    .messages({
      "any.only": "Tipo de entrenamiento inválido.",
    }),

  terrainType: Joi.string()
    .valid(...validTerrainTypes)
    .required()
    .messages({
      "any.only": "Tipo de terreno inválido.",
    }),

  weather: Joi.string()
    .valid(...validWeather)
    .required()
    .messages({
      "any.only": "Tipo de clima inválido.",
    }),
});

module.exports = {
  trainingSchema,
};
