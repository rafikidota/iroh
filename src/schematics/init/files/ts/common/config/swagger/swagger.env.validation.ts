import * as Joi from 'joi';

export const SwaggerConfigValidationSchema = Joi.object({
  SWAGGER: Joi.string().required(),
  SWAGGER_JSON: Joi.string().required(),
});
