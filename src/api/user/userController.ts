import * as Boom from "@hapi/boom";
import { ResponseObject, ResponseToolkit } from "@hapi/hapi";

import { User } from "../../entities";
import {
  IGetManyRequest,
  IGetOneRequest,
  IRegisterRequest,
  IUpdateRequest,
} from "../../interfaces/request";

type register = (
  request: IRegisterRequest,
  h: ResponseToolkit,
) => Promise<ResponseObject>;

type update = (
  request: IUpdateRequest,
  h: ResponseToolkit,
) => Promise<ResponseObject>;

type getOne = (
  request: IGetOneRequest,
  h: ResponseToolkit,
) => Promise<ResponseObject>;

type getMany = (
  request: IGetManyRequest,
  h: ResponseToolkit,
) => Promise<ResponseObject>;

export const register: register = async (
  request: IRegisterRequest,
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

export const update: update = async (
  request: IUpdateRequest,
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

export const getOne: getOne = async (
  request: IGetOneRequest,
  h: ResponseToolkit,
): Promise<ResponseObject> => {
  const { id } = request.params;
  const user: User | undefined = await User.findOne({ id });
  if (user === undefined) {
    throw Boom.notFound("User not found.");
  }

  return h.response(user);
};

export const getMany: getMany = async (
  request: IGetManyRequest,
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
