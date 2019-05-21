import { Server } from "@hapi/hapi";
import * as Vision from "@hapi/vision";

import * as User from "./api/user";

export const init = async (): Promise<Server> => {
  const server = new Server({
    host: "localhost",
    port: 3000,
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  User.init(server);

  await server.register(Vision);

  return server;
};
