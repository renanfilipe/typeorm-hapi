import * as Joi from "@hapi/joi";

export const idSchema = Joi.object()
  .keys({
    id: Joi.string()
      .uuid()
      .required(),
});

export const getManyUsersSchema = Joi.object()
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
