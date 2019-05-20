import * as Joi from "@hapi/joi";

enum enumRegister {
  documentMaxLength = 100,
  firstNameMaxLength = 100,
  lastNameMaxLength = 100,
}

export const registerSchema: Joi.ObjectSchema = Joi.object()
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
