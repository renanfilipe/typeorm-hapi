import * as Joi from "@hapi/joi";

enum Register {
  documentMaxLength = 100,
  firstNameMaxLength = 100,
  lastNameMaxLength = 100,
}

export const registerUserSchema: Joi.ObjectSchema = Joi.object()
  .keys({
    accountNumber: Joi.string()
      .regex(/^[0-9]*$/)
      .required(),
    age: Joi.number()
      .min(0)
      .required(),
    document: Joi.string()
      .max(Register.documentMaxLength)
      .required(),
    firstName: Joi.string()
      .max(Register.firstNameMaxLength)
      .required(),
    lastName: Joi.string()
      .max(Register.lastNameMaxLength),
});

export const updateUserSchema: Joi.ObjectSchema = Joi.object()
  .keys({
    accountNumber: Joi.string()
      .regex(/^[0-9]*$/)
      .required(),
    age: Joi.number()
      .min(0)
      .required(),
    document: Joi.string()
      .max(Register.documentMaxLength)
      .required(),
    firstName: Joi.string()
      .max(Register.firstNameMaxLength)
      .required(),
    id: Joi.string()
      .uuid()
      .required(),
    lastName: Joi.string()
      .max(Register.lastNameMaxLength),
});

export const loginSchema: Joi.ObjectSchema = Joi.object()
  .keys({
    document: Joi.string()
      .max(Register.documentMaxLength)
      .required(),
});
