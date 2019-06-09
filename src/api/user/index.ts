import { Server } from "@hapi/hapi";

import { EntityName, getMany, getOne, remove } from "../../common/handler";
import { getManySchema, idSchema } from "../../common/validate";

import { login, registerUser, updateUser } from "./userController";
import { loginSchema, registerUserSchema, updateUserSchema } from "./userValidator";

type init = (server: Server) => void;

/**
 * Contains all routes related to the user entity
 */
export const init: init = (server: Server): void => {
  server.route({
    method: "POST",
    options: {
      auth: "jwt",
      handler: registerUser,
      validate: {
        payload: registerUserSchema,
      },
    },
    path: "/user",
  });

  server.route({
    method: "PUT",
    options: {
      auth: "jwt",
      handler: updateUser,
      validate: {
        params: idSchema,
        payload: updateUserSchema,
      },
    },
    path: "/user/{id}",
  });

  server.route({
    method: "GET",
    options: {
      auth: "jwt",
      handler: getOne(EntityName.User),
      validate: {
        params: idSchema,
      },
    },
    path: "/user/{id}",
  });

  server.route({
    method: "GET",
    options: {
      auth: "jwt",
      handler: getMany(EntityName.User),
      validate: {
        query: getManySchema,
      },
    },
    path: "/user",
  });

  server.route({
    method: "DELETE",
    options: {
      auth: "jwt",
      handler: remove(EntityName.User),
      validate: {
        params: idSchema,
      },
    },
    path: "/user/{id}",
  });

  server.route({
    method: "POST",
    options: {
      auth: false,
      handler: login,
      validate: {
        payload: loginSchema,
      },
    },
    path: "/login",
  });
};
