import * as Boom from "@hapi/boom";
import { ResponseObject, ResponseToolkit } from "@hapi/hapi";
import { GetManyRequest, IdParamRequest } from "../../common/interface";
import { Account, Pet, User } from "../../entities";
import { RegisterUserRequest, UpdateUserRequest } from "./userInterface";

enum enumAccount {
  value = 123,
}

export const registerUser = async (
  request: RegisterUserRequest,
  h: ResponseToolkit,
): Promise<ResponseObject> => {
  const { firstName, lastName, age, document } = request.payload;
  const user = await User.findOne({ document });
  if (user instanceof User) {
    throw Boom.preconditionFailed("Document already registred.");
  }
  const newUser = new User();
  newUser.firstName = firstName;
  newUser.lastName = lastName;
  newUser.document = document;
  newUser.age = age;
  await newUser.save();

  const account = new Account();
  account.number = enumAccount.value;
  account.user = newUser;
  await account.save();

  const petA = new Pet();
  petA.name = "escola";
  petA.user = newUser;
  await petA.save();

  const petB = new Pet();
  petB.name = "da vida";
  petB.user = newUser;
  await petB.save();

  return h.response(account);
};

export const updateUser = async (
  request: UpdateUserRequest,
  h: ResponseToolkit,
): Promise<ResponseObject> => {
  const { id, firstName, lastName, age, document } = request.payload;
  const user = await User.findOne({ id });
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

export const getOneUser = async (
  request: IdParamRequest,
  h: ResponseToolkit,
): Promise<ResponseObject> => {
  const { id } = request.params;
  const user = await User.findOne({ id });
  if (user === undefined) {
    throw Boom.notFound("User not found.");
  }

  return h.response(user);
};

export const getManyUsers = async (
  request: GetManyRequest,
  h: ResponseToolkit,
): Promise<ResponseObject> => {
  const { _start, _end, _order, _sort } = request.query;

  const users = await User.find({
    order: {
      [_sort]: _order,
    },
    skip: Number(_start),
    take: Number(_end) - Number(_start),
  });
  const usersCount = await User.count();

  return h
    .response(users)
    .header("X-Total-Count", usersCount.toString())
    .header("Access-Control-Expose-Headers", "X-Total-Count");
};

export const deleteUser = async (
  request: IdParamRequest,
  h: ResponseToolkit,
): Promise<ResponseObject> => {
  const { id } = request.params;
  const user = await User.findOne({ id });
  if (!(user instanceof User)) {
    throw Boom.notFound("User not found.");
  }
  await user.remove();

  return h.response(user);
};
