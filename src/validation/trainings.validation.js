const Joi = require("joi");

// Constantes para validaciones
const MIN_TIME_MINUTES = 1;
const MAX_TIME_MINUTES = 1440; // 24 horas
const MIN_DISTANCE_KM = 0.1;
const MAX_DISTANCE_KM = 100;
const MIN_RHYTHM_MIN_KM = 2;
const MAX_RHYTHM_MIN_KM = 20;
const MIN_ALTITUDE_M = -500;
const MAX_ALTITUDE_M = 9000;
const MAX_NOTES_LENGTH = 1000;

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
  time_minutes: Joi.number()
    .min(MIN_TIME_MINUTES)
    .max(MAX_TIME_MINUTES)
    .required()
    .messages({
      "number.base": "El tiempo debe ser un número.",
      "number.min": `El tiempo mínimo debe ser ${MIN_TIME_MINUTES} minuto.`,
      "number.max": `El tiempo no puede superar las ${MAX_TIME_MINUTES / 60} horas.`,
      "any.required": "El tiempo es requerido.",
    }),

  distance_km: Joi.number()
    .min(MIN_DISTANCE_KM)
    .max(MAX_DISTANCE_KM)
    .required()
    .messages({
      "number.base": "La distancia debe ser un número.",
      "number.min": `La distancia debe ser mayor a ${MIN_DISTANCE_KM} km.`,
      "number.max": `La distancia no puede ser mayor a ${MAX_DISTANCE_KM} km.`,
      "any.required": "La distancia es requerida.",
    }),

  rhythm: Joi.number()
    .min(MIN_RHYTHM_MIN_KM)
    .max(MAX_RHYTHM_MIN_KM)
    .required()
    .messages({
      "number.base": "El ritmo debe ser un número.",
      "number.min": `El ritmo no puede ser menor a ${MIN_RHYTHM_MIN_KM} min/km.`,
      "number.max": `El ritmo no puede ser mayor a ${MAX_RHYTHM_MIN_KM} min/km.`,
      "any.required": "El ritmo es requerido.",
    }),

  date: Joi.date()
    .max("now")
    .required()
    .messages({
      "date.base": "La fecha debe ser una fecha válida.",
      "date.max": "La fecha del entrenamiento no puede ser futura.",
      "any.required": "La fecha es requerida.",
    }),

  altitude: Joi.number()
    .min(MIN_ALTITUDE_M)
    .max(MAX_ALTITUDE_M)
    .required()
    .messages({
      "number.base": "La altitud debe ser un número.",
      "number.min": `La altitud no puede ser menor a ${MIN_ALTITUDE_M} m.`,
      "number.max": `La altitud no puede ser mayor a ${MAX_ALTITUDE_M} m.`,
      "any.required": "La altitud es requerida.",
    }),

  notes: Joi.string()
    .max(MAX_NOTES_LENGTH)
    .allow("")
    .optional()
    .messages({
      "string.base": "Las notas deben ser un texto.",
      "string.max": `Las notas no deben exceder los ${MAX_NOTES_LENGTH} caracteres.`,
    }),

  trainingType: Joi.string()
    .valid(...validTrainingTypes)
    .required()
    .messages({
      "string.base": "El tipo de entrenamiento debe ser un texto.",
      "any.only": "Tipo de entrenamiento inválido. Valores permitidos: " + validTrainingTypes.join(", "),
      "any.required": "El tipo de entrenamiento es requerido.",
    }),

  terrainType: Joi.string()
    .valid(...validTerrainTypes)
    .required()
    .messages({
      "string.base": "El tipo de terreno debe ser un texto.",
      "any.only": "Tipo de terreno inválido. Valores permitidos: " + validTerrainTypes.join(", "),
      "any.required": "El tipo de terreno es requerido.",
    }),

  weather: Joi.string()
    .valid(...validWeather)
    .required()
    .messages({
      "string.base": "El clima debe ser un texto.",
      "any.only": "Tipo de clima inválido. Valores permitidos: " + validWeather.join(", "),
      "any.required": "El clima es requerido.",
    }),
})
.custom((value, helpers) => {
  const { time_minutes, distance_km, rhythm, trainingType, altitude, weather } = value;

  // Validación 1: Ritmo calculado vs ritmo proporcionado
  const calculatedRhythm = time_minutes / distance_km;
  const rhythmDifference = Math.abs(calculatedRhythm - rhythm);
  
  if (rhythmDifference > 1) { // Tolerancia de 1 min/km
    return helpers.error("any.invalid", { 
      message: `El ritmo proporcionado (${rhythm} min/km) no coincide con el calculado (${calculatedRhythm.toFixed(2)} min/km). Diferencia: ${rhythmDifference.toFixed(2)} min/km` 
    });
  }



  // Validación 2: Consistencia entre altitud y clima
  if (altitude > 3000 && weather === "Húmedo") {
    return helpers.error("any.invalid", { 
      message: "En altitudes superiores a 3000m, el clima húmedo es poco probable. Verifica los datos." 
    });
  }

  if (altitude < 0 && weather === "Nevado") {
    return helpers.error("any.invalid", { 
      message: "En altitudes bajo el nivel del mar, el clima nevado es imposible. Verifica los datos." 
    });
  }

  // Validación 3: Consistencia entre terreno y clima
  if (terrainType === "Arena" && weather === "Nevado") {
    return helpers.error("any.invalid", { 
      message: "La combinación de terreno arenoso y clima nevado es poco probable. Verifica los datos." 
    });
  }

  // Validación 4: Velocidad realista
  const speedKmH = (distance_km / time_minutes) * 60;
  if (speedKmH > 25) { // Más de 25 km/h es muy rápido para la mayoría
    return helpers.error("any.invalid", { 
      message: `La velocidad calculada (${speedKmH.toFixed(2)} km/h) parece muy alta. Verifica tiempo y distancia.` 
    });
  }

  if (speedKmH < 2) { // Menos de 2 km/h es muy lento
    return helpers.error("any.invalid", { 
      message: `La velocidad calculada (${speedKmH.toFixed(2)} km/h) parece muy baja. Verifica tiempo y distancia.` 
    });
  }

  return value;
})
.messages({
  "any.invalid": "Datos de entrenamiento inconsistentes: {#message}",
});

module.exports = {
  trainingSchema,
};
