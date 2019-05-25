import { Request, ResponseToolkit, Server } from "@hapi/hapi";
import * as Vision from "@hapi/vision";

import * as User from "./api/user";

type init = () => Promise<Server>;

export const init: init = async (): Promise<Server> => {
  const server: Server = new Server({
    host: "localhost",
    port: 3000,
    routes: {
      cors: {
        origin: ["*"],
      },
      validate: {
        failAction: async (
          request: Request,
          h: ResponseToolkit,
          err: Error | undefined,
        ): Promise<void> => {
          if (err instanceof Error) {
            throw err;
          }
        },
      },
    },
  });

  User.init(server);

  await server.register(Vision);

  return server;
};
