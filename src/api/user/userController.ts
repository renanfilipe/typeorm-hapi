import * as Boom from "@hapi/boom";
import { ResponseObject, ResponseToolkit } from "@hapi/hapi";

import { Account, User } from "../../entities";

import { RegisterUserRequest, UpdateUserRequest } from "./userInterface";

type registerUser = (request: RegisterUserRequest, h: ResponseToolkit) => Promise<ResponseObject>;
type updateUser = (request: UpdateUserRequest, h: ResponseToolkit) => Promise<ResponseObject>;

export const registerUser: registerUser = async (
  request: RegisterUserRequest,
  h: ResponseToolkit,
): Promise<ResponseObject> => {
  const { firstName, lastName, age, document, accountNumber } = request.payload;
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
  account.number = accountNumber;
  account.user = newUser;
  await account.save();

  return h.response(account);
};

export const updateUser: updateUser = async (
  request: UpdateUserRequest,
  h: ResponseToolkit,
): Promise<ResponseObject> => {
  const {
    id,
    firstName,
    lastName,
    age,
    document,
    accountNumber,
  } = request.payload;
  const user: User | undefined = await User.findOne({ id });
  if (user === undefined) {
    throw Boom.notFound("User not found.");
  }

  const account: Account | undefined = await Account.findOneOrFail({
    relations: ["user"],
    where: {
      user,
    },
  });

  user.firstName = firstName;
  user.lastName = lastName;
  user.document = document;
  user.age = age;
  await user.save();

  account.number = accountNumber;
  await account.save();

  return h.response(account);
};
