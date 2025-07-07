const Joi = require("joi");

const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  gender: Joi.string().valid("Masculino", "Femenino", "No binario","Otro", "Prefiero no decirlo").required(),
  birthdate: Joi.date().less("now").required(),
  username: Joi.string().required(),
  user_stats: Joi.object({
    exp_level: Joi.string().valid("Principiante", "Intermedio", "Avanzado","Experto","Maestro").required(),
    weight: Joi.number().positive().required(),
    height: Joi.number().positive().required(),
  })
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const updateUserStatsSchema = Joi.object({
  weight: Joi.number().positive().required(),
  height: Joi.number().positive().required(),
});

const addBadgeToUserSchema = Joi.object({
    badgeId: Joi.number().required(),
})

const addFriendSchema = Joi.object({
    userId: Joi.number().required(),
    friendId: Joi.number().required(),
})

// const updateKilometersSchema = Joi.object({
//   kilometers: Joi.number().positive().required(),
// });

// const updateBestRhythmSchema = Joi.object({
//   bestRhythm: Joi.number().positive().required(),
// });

module.exports = {
  createUserSchema,
  loginSchema,
  updateUserStatsSchema,
  addBadgeToUserSchema,
  addFriendSchema
//   updateKilometersSchema,
//   updateBestRhythmSchema,
};
