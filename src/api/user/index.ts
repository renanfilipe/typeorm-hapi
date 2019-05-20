import { Server } from "@hapi/hapi";

import {
  deleteUser,
  getManyUsers,
  getOneUser,
  registerUser,
  updateUser,
} from "./userController";
import {
  getManyUsersSchema,
  idSchema,
  registerUserSchema,
  updateUserSchema,
} from "./userValidator";

type init = (server: Server) => void;

export const init: init = (server: Server): void => {
  server.route({
    handler: registerUser,
    method: "POST",
    options: {
      validate: {
        payload: registerUserSchema,
      },
    },
    path: "/user",
  });

  server.route({
    handler: updateUser,
    method: "PUT",
    options: {
      validate: {
        params: idSchema,
        payload: updateUserSchema,
      },
    },
    path: "/user/{id}",
  });

  server.route({
    handler: getOneUser,
    method: "GET",
    options: {
      validate: {
        params: idSchema,
      },
    },
    path: "/user/{id}",
  });

  server.route({
    handler: getManyUsers,
    method: "GET",
    options: {
      validate: {
        query: getManyUsersSchema,
      },
    },
    path: "/user",
  });

  server.route({
    handler: deleteUser,
    method: "DELETE",
    options: {
      validate: {
        params: idSchema,
      },
    },
    path: "/user/{id}",
  });
};
