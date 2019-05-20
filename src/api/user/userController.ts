import * as Boom from "@hapi/boom";
import { ResponseObject, ResponseToolkit } from "@hapi/hapi";

import { User } from "../../entities";
import {
  IGetManyUsersRequest,
  IIdParamRequest,
  IRegisterUserRequest,
  IUpdateUserRequest,
} from "../../interfaces/request";

type registerUser = (
  request: IRegisterUserRequest,
  h: ResponseToolkit,
) => Promise<ResponseObject>;

type updateUser = (
  request: IUpdateUserRequest,
  h: ResponseToolkit,
) => Promise<ResponseObject>;

type idParam = (
  request: IIdParamRequest,
  h: ResponseToolkit,
) => Promise<ResponseObject>;

type getManyUsers = (
  request: IGetManyUsersRequest,
  h: ResponseToolkit,
) => Promise<ResponseObject>;

export const registerUser: registerUser = async (
  request: IRegisterUserRequest,
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

  return h.response(newUser);
};

export const updateUser: updateUser = async (
  request: IUpdateUserRequest,
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

export const getOneUser: idParam = async (
  request: IIdParamRequest,
  h: ResponseToolkit,
): Promise<ResponseObject> => {
  const { id } = request.params;
  const user: User | undefined = await User.findOne({ id });
  if (user === undefined) {
    throw Boom.notFound("User not found.");
  }

  return h.response(user);
};

export const getManyUsers: getManyUsers = async (
  request: IGetManyUsersRequest,
  h: ResponseToolkit,
): Promise<ResponseObject> => {
  const { _start, _end, _order, _sort } = request.query;

  const users: User[] = await User.find({
    order: {
      [_sort]: _order,
    },
    skip: Number(_start),
    take: Number(_end) - Number(_start),
  });
  const usersCount: number = await User.count();

  return h
    .response(users)
    .header("X-Total-Count", usersCount.toString())
    .header("Access-Control-Expose-Headers", "X-Total-Count");
};

export const deleteUser: idParam = async (
  request: IIdParamRequest,
  h: ResponseToolkit,
): Promise<ResponseObject> => {
  const { id } = request.params;
  const user: User | undefined = await User.findOne({ id });
  if (!(user instanceof User)) {
    throw Boom.notFound("User not found.");
  }
  await user.remove();

  return h.response(user);
};
