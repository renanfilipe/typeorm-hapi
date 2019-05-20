import { Server } from "@hapi/hapi";

import { getMany, getOne, register, update } from "./userController";
import {
  getManySchema,
  idSchema,
  registerSchema,
  updateSchema,
} from "./userValidator";

type init = (server: Server) => void;

export const init: init = (server: Server): void => {
  server.route({
    handler: register,
    method: "POST",
    options: {
      validate: {
        payload: registerSchema,
      },
    },
    path: "/user",
  });

  server.route({
    handler: update,
    method: "PUT",
    options: {
      validate: {
        params: idSchema,
        payload: updateSchema,
      },
    },
    path: "/user/{id}",
  });

  server.route({
    handler: getOne,
    method: "GET",
    options: {
      validate: {
        params: idSchema,
      },
    },
    path: "/user/{id}",
  });

  server.route({
    handler: getMany,
    method: "GET",
    options: {
      validate: {
        query: getManySchema,
      },
    },
    path: "/user",
  });
};
