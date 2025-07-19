const Joi = require("joi");

// Constantes para validaciones
const MIN_AGE = 13;
const MAX_AGE = 100;
const MIN_WEIGHT = 20; 
const MAX_WEIGHT = 300; 
const MIN_HEIGHT = 100; 
const MAX_HEIGHT = 250; 

const createUserSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(100)
    .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .required()
    .messages({
      "string.base": "El nombre debe ser un texto.",
      "string.empty": "El nombre no puede estar vacío.",
      "string.min": "El nombre debe tener al menos 2 caracteres.",
      "string.max": "El nombre no puede exceder los 100 caracteres.",
      "string.pattern.base": "El nombre solo puede contener letras y espacios.",
      "any.required": "El nombre es requerido.",
    }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .max(255)
    .required()
    .messages({
      "string.base": "El email debe ser un texto.",
      "string.empty": "El email no puede estar vacío.",
      "string.email": "El email debe tener un formato válido.",
      "string.max": "El email no puede exceder los 255 caracteres.",
      "any.required": "El email es requerido.",
    }),

  password: Joi.string()
    .min(8)
    .max(128)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .required()
    .messages({
      "string.base": "La contraseña debe ser un texto.",
      "string.empty": "La contraseña no puede estar vacía.",
      "string.min": "La contraseña debe tener al menos 8 caracteres.",
      "string.max": "La contraseña no puede exceder los 128 caracteres.",
      "string.pattern.base": "La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial (@$!%*?&).",
      "any.required": "La contraseña es requerida.",
    }),

  gender: Joi.string()
    .valid("Masculino", "Femenino", "No binario", "Otro", "Prefiero no decirlo")
    .required()
    .messages({
      "string.base": "El género debe ser un texto.",
      "any.only": "El género debe ser uno de los valores permitidos.",
      "any.required": "El género es requerido.",
    }),

  birthdate: Joi.date()
    .max("now")
    .custom((value, helpers) => {
      const today = new Date();
      const birthDate = new Date(value);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      
      if (age < MIN_AGE) {
        return helpers.error("any.invalid", { 
          message: `La edad mínima debe ser ${MIN_AGE} años.` 
        });
      }
      
      if (age > MAX_AGE) {
        return helpers.error("any.invalid", { 
          message: `La edad máxima debe ser ${MAX_AGE} años.` 
        });
      }
      
      return value;
    })
    .required()
    .messages({
      "date.base": "La fecha de nacimiento debe ser una fecha válida.",
      "date.max": "La fecha de nacimiento no puede ser futura.",
      "any.invalid": "La edad debe estar entre 13 y 100 años.",
      "any.required": "La fecha de nacimiento es requerida.",
    }),

  username: Joi.string()
    .min(3)
    .max(30)
    .pattern(/^[a-zA-Z0-9_]+$/)
    .required()
    .messages({
      "string.base": "El nombre de usuario debe ser un texto.",
      "string.empty": "El nombre de usuario no puede estar vacío.",
      "string.min": "El nombre de usuario debe tener al menos 3 caracteres.",
      "string.max": "El nombre de usuario no puede exceder los 30 caracteres.",
      "string.pattern.base": "El nombre de usuario solo puede contener letras, números y guiones bajos.",
      "any.required": "El nombre de usuario es requerido.",
    }),

  user_stats: Joi.object({
    exp_level: Joi.string()
      .valid("Principiante", "Intermedio", "Avanzado", "Experto", "Maestro")
      .required()
      .messages({
        "string.base": "El nivel de experiencia debe ser un texto.",
        "any.only": "El nivel de experiencia debe ser uno de los valores permitidos.",
        "any.required": "El nivel de experiencia es requerido.",
      }),

    weight: Joi.number()
      .min(MIN_WEIGHT)
      .max(MAX_WEIGHT)
      .required()
      .messages({
        "number.base": "El peso debe ser un número.",
        "number.min": `El peso debe ser al menos ${MIN_WEIGHT} kg.`,
        "number.max": `El peso no puede exceder ${MAX_WEIGHT} kg.`,
        "any.required": "El peso es requerido.",
      }),

    height: Joi.number()
      .min(MIN_HEIGHT)
      .max(MAX_HEIGHT)
      .required()
      .messages({
        "number.base": "La altura debe ser un número.",
        "number.min": `La altura debe ser al menos ${MIN_HEIGHT} cm.`,
        "number.max": `La altura no puede exceder ${MAX_HEIGHT} cm.`,
        "any.required": "La altura es requerida.",
      }),
  })
  .required()
  .messages({
    "object.base": "Las estadísticas del usuario deben ser un objeto.",
    "any.required": "Las estadísticas del usuario son requeridas.",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .required()
    .messages({
      "string.base": "El username o email debe ser un texto.",
      "string.empty": "El username o email no puede estar vacío.",
      "any.required": "El username o email es requerido.",
    }),

  password: Joi.string()
    .required()
    .messages({
      "string.base": "La contraseña debe ser un texto.",
      "string.empty": "La contraseña no puede estar vacía.",
      "any.required": "La contraseña es requerida.",
    }),
});

const updateUserStatsSchema = Joi.object({
  weight: Joi.number()
    .min(MIN_WEIGHT)
    .max(MAX_WEIGHT)
    .required()
    .messages({
      "number.base": "El peso debe ser un número.",
      "number.min": `El peso debe ser al menos ${MIN_WEIGHT} kg.`,
      "number.max": `El peso no puede exceder ${MAX_WEIGHT} kg.`,
      "any.required": "El peso es requerido.",
    }),

  height: Joi.number()
    .min(MIN_HEIGHT)
    .max(MAX_HEIGHT)
    .required()
    .messages({
      "number.base": "La altura debe ser un número.",
      "number.min": `La altura debe ser al menos ${MIN_HEIGHT} cm.`,
      "number.max": `La altura no puede exceder ${MAX_HEIGHT} cm.`,
      "any.required": "La altura es requerida.",
    }),

  exp_level: Joi.string()
    .valid("Principiante", "Intermedio", "Avanzado", "Experto", "Maestro")
    .required()
    .messages({
      "string.base": "El nivel de experiencia debe ser un texto.",
      "any.only": "El nivel de experiencia debe ser uno de los valores permitidos.",
      "any.required": "El nivel de experiencia es requerido.",
    }),
});

const addBadgeToUserSchema = Joi.object({
  badgeId: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": "El ID de la insignia debe ser un número.",
      "number.integer": "El ID de la insignia debe ser un número entero.",
      "number.positive": "El ID de la insignia debe ser un número positivo.",
      "any.required": "El ID de la insignia es requerido.",
    }),
});

const addFriendSchema = Joi.object({
  userId: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": "El ID del usuario debe ser un número.",
      "number.integer": "El ID del usuario debe ser un número entero.",
      "number.positive": "El ID del usuario debe ser un número positivo.",
      "any.required": "El ID del usuario es requerido.",
    }),

  friendId: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": "El ID del amigo debe ser un número.",
      "number.integer": "El ID del amigo debe ser un número entero.",
      "number.positive": "El ID del amigo debe ser un número positivo.",
      "any.required": "El ID del amigo es requerido.",
    }),
}).custom((value, helpers) => {
  if (value.userId === value.friendId) {
    return helpers.error("any.invalid", { 
      message: "No puedes agregarte a ti mismo como amigo." 
    });
  }
  return value;
});

module.exports = {
  createUserSchema,
  loginSchema,
  updateUserStatsSchema,
  addBadgeToUserSchema,
  addFriendSchema,
};
