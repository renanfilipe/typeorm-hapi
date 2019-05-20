import { Server } from "@hapi/hapi";

import { register } from "./userController";
import { registerSchema } from "./userValidator";

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
    path: "/register",
  });
};
