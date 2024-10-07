import * as Joi from 'joi';

export const ApiConfigValidationSchema = Joi.object({
  API_HOST: Joi.string().required(),
  API_PORT: Joi.string().required(),
});
