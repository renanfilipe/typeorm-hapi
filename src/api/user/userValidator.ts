import * as Joi from "@hapi/joi";

enum enumRegister {
  documentMaxLength = 100,
  firstNameMaxLength = 100,
  lastNameMaxLength = 100,
}

export const registerUserSchema: Joi.ObjectSchema = Joi.object()
  .keys({
    age: Joi.number()
      .min(0)
      .required(),
    document: Joi.string()
      .max(enumRegister.documentMaxLength)
      .required(),
    firstName: Joi.string()
      .max(enumRegister.firstNameMaxLength)
      .required(),
    lastName: Joi.string()
      .max(enumRegister.lastNameMaxLength),
});

export const updateUserSchema: Joi.ObjectSchema = Joi.object()
  .keys({
    age: Joi.number()
      .min(0)
      .required(),
    document: Joi.string()
      .max(enumRegister.documentMaxLength)
      .required(),
    firstName: Joi.string()
      .max(enumRegister.firstNameMaxLength)
      .required(),
    id: Joi.string()
      .uuid()
      .required(),
    lastName: Joi.string()
      .max(enumRegister.lastNameMaxLength),
});

export const idSchema: Joi.ObjectSchema = Joi.object()
  .keys({
    id: Joi.string()
      .uuid()
      .required(),
});

export const getManyUsersSchema: Joi.ObjectSchema = Joi.object()
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
