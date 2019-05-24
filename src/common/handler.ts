import { notFound } from "@hapi/boom";
import { ResponseObject, ResponseToolkit } from "@hapi/hapi";
import * as Database from "../entities";
import { GetManyRequest, IdParamRequest } from "./interface";

type getOne = (request: IdParamRequest, h: ResponseToolkit) => Promise<ResponseObject>;
type getMany = (request: IdParamRequest, h: ResponseToolkit) => Promise<ResponseObject>;
type database =
  | typeof Database.Account
  | typeof Database.Pet
  | typeof Database.User;

enum enumEntityName {
  Account = "Account",
  Pet = "Pet",
  User = "User",
}

export const getOne = (entityName: enumEntityName): getOne => async (
  request: IdParamRequest,
  h: ResponseToolkit,
): Promise<ResponseObject> => {
  const { id } = request.params;
  const entity: database = Database[entityName];
  const item = await entity.findOne({ id });
  if (item === undefined) {
    throw notFound("User not found.");
  }

  return h.response(item);
};

export const getMany = (entityName: enumEntityName)  => async (
  request: GetManyRequest,
  h: ResponseToolkit,
): Promise<ResponseObject> => {
  const { _start, _end, _order, _sort } = request.query;
  const entity: database = Database[entityName];

  const items = await entity.find({
    order: {
      [_sort]: _order,
    },
    skip: Number(_start),
    take: Number(_end) - Number(_start),
  });
  const count = await entity.count();

  return h
    .response(items)
    .header("X-Total-Count", count.toString())
    .header("Access-Control-Expose-Headers", "X-Total-Count");
};

export const remove = (entityName: enumEntityName) => async (
  request: IdParamRequest,
  h: ResponseToolkit,
): Promise<ResponseObject> => {
  const { id } = request.params;
  const entity: database = Database[entityName];
  const item = await entity.findOne({ id });
  if (!(item instanceof entity)) {
    throw notFound("User not found.");
  }
  await item.remove();

  return h.response(item);
};
