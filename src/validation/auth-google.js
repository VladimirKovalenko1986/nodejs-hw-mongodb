import Joi from 'joi';

const loginWithGoogleOAuthSchema = Joi.object({
  code: Joi.string().required(),
});

export { loginWithGoogleOAuthSchema };
