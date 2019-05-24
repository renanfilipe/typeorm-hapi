import * as Joi from "@hapi/joi";

enum enumRegister {
  documentMaxLength = 100,
  firstNameMaxLength = 100,
  lastNameMaxLength = 100,
}

export const registerUserSchema = Joi.object()
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

export const updateUserSchema = Joi.object()
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
