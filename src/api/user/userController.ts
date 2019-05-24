import * as Boom from "@hapi/boom";
import { ResponseObject, ResponseToolkit } from "@hapi/hapi";

import { Account, Pet, User } from "../../entities";

import { RegisterUserRequest, UpdateUserRequest } from "./userInterface";

type registerUser = (request: RegisterUserRequest, h: ResponseToolkit) => Promise<ResponseObject>;
type updateUser = (request: UpdateUserRequest, h: ResponseToolkit) => Promise<ResponseObject>;
enum enumAccount {
  value = 123,
}

export const registerUser: registerUser = async (
  request: RegisterUserRequest,
  h: ResponseToolkit,
): Promise<ResponseObject> => {
  const { firstName, lastName, age, document } = request.payload;
  const user: User | undefined = await User.findOne({ document });
  if (user instanceof User) {
    throw Boom.preconditionFailed("Document already registred.");
  }
  const newUser: User = new User();
  newUser.firstName = firstName;
  newUser.lastName = lastName;
  newUser.document = document;
  newUser.age = age;
  await newUser.save();

  const account: Account = new Account();
  account.number = enumAccount.value;
  account.user = newUser;
  await account.save();

  const petA: Pet = new Pet();
  petA.name = "escola";
  petA.user = newUser;
  await petA.save();

  const petB: Pet = new Pet();
  petB.name = "da vida";
  petB.user = newUser;
  await petB.save();

  return h.response(account);
};

export const updateUser: updateUser = async (
  request: UpdateUserRequest,
  h: ResponseToolkit,
): Promise<ResponseObject> => {
  const { id, firstName, lastName, age, document } = request.payload;
  const user: User | undefined = await User.findOne({ id });
  if (user === undefined) {
    throw Boom.notFound("User not found.");
  }
  user.firstName = firstName;
  user.lastName = lastName;
  user.document = document;
  user.age = age;
  await user.save();

  return h.response(user);
};
