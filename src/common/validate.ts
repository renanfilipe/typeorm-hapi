import * as Joi from "@hapi/joi";

export const nodeEnvSchema: Joi.ObjectSchema = Joi.object()
  .keys({
    DATABASE_NAME: Joi.string()
      .required(),
    DATABASE_PASSWORD: Joi.string()
      .required(),
    DATABASE_PORT: Joi.string()
      .required(),
    DATABASE_URL: Joi.string()
      .required(),
    DATABASE_USERNAME: Joi.string()
      .required(),
    JWT_SECRET: Joi.string()
      .required(),
    NODE_ENV: Joi.string()
      .required(),
  });

export const idSchema: Joi.ObjectSchema = Joi.object()
  .keys({
    id: Joi.string()
      .uuid()
      .required(),
  });

export const getManySchema: Joi.ObjectSchema = Joi.object()
  .keys({
    _end: Joi.string()
      .trim(),
    _order: Joi.string()
      .trim()
      .valid(["ASC"], ["DESC"])
      .required(),
    _sort: Joi.string()
      .trim()
      .required(),
    _start: Joi.string()
      .trim()
      .required(),
  });
