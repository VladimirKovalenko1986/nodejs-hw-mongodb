import Joi from 'joi';

const requestResetEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});

const resetPasswordSchema = Joi.object({
  password: Joi.string().min(6).required(),
  token: Joi.string().required(),
});

export { requestResetEmailSchema, resetPasswordSchema };
