const Joi = require("joi");

const questionRequestSchema = Joi.object({
  question: Joi.string()
    .min(3)
    .max(500)
    .required()
    .messages({
      "string.base": "La pregunta debe ser un texto.",
      "string.min": "La pregunta debe tener al menos 3 caracteres.",
      "string.max": "La pregunta no puede exceder los 500 caracteres.",
      "any.required": "La pregunta es requerida.",
    }),
});

module.exports = {
  questionRequestSchema,
};
