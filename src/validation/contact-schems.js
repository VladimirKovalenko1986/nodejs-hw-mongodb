import Joi from 'joi';
import {
  emailFormate,
  contactTypeList,
} from '../constants/contact-constants.js';

const contactAddSchem = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().min(3).max(20).required(),
  email: Joi.string().min(3).max(20).pattern(emailFormate),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid(...contactTypeList),
});

const contactUpdateSchem = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().min(3).max(20),
  email: Joi.string().min(3).max(20).pattern(emailFormate),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid(...contactTypeList),
});

export { contactAddSchem, contactUpdateSchem };
