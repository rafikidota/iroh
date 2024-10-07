import * as Joi from 'joi';

export const AuthConfigValidationSchema = Joi.object({
  JWT_SECRET: Joi.string().required(),
});
