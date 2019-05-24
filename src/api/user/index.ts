import { Server } from "@hapi/hapi";

import { EntityName, getMany, getOne, remove } from "../../common/handler";
import { getManySchema, idSchema } from "../../common/validate";

import { registerUser, updateUser } from "./userController";
import { registerUserSchema, updateUserSchema } from "./userValidator";

type init = (server: Server) => void;

export const init: init = (server: Server): void => {
  server.route({
    method: "POST",
    options: {
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
      handler: remove(EntityName.User),
      validate: {
        params: idSchema,
      },
    },
    path: "/user/{id}",
  });
};
