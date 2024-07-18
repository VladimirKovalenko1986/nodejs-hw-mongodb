import Joi from 'joi';
import { authEmailFormate } from '../constants/auth-constants.js';

const userSignupSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().pattern(authEmailFormate).required(),
  password: Joi.string().min(6).required(),
});

const userSigninSchema = Joi.object({
  email: Joi.string().pattern(authEmailFormate).required(),
  password: Joi.string().min(6).required(),
});

export { userSignupSchema, userSigninSchema };
