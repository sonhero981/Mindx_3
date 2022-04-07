const Joi = require("joi");
const registerSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().required(),
});

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().required(),
});

module.exports = {
  registerSchema,
  loginSchema,
};
