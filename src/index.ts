import * as Boom from "@hapi/boom";
import { Request, ResponseObject, ResponseToolkit, Server } from "@hapi/hapi";
import * as Dotenv from "dotenv";
import * as ReflectMetada from "reflect-metadata";
import { createConnection } from "typeorm";

import { init } from "./server";

type start = () => Promise<void>;
type preResponse = (request: Request, h: ResponseToolkit) => symbol;

const preResponse: preResponse = (
  request: Request,
  h: ResponseToolkit,
): symbol => {
  const response: ResponseObject | Boom = request.response;

  if (!(response as Boom).isBoom) {
    return h.continue;
  }

  console.info(response.message);
  throw response;
};

const start: start = async (): Promise<void> => {
  await createConnection();
  console.log("Connected to database!");
  const server: Server = await init();
  server.ext("onPreResponse", preResponse);
  await server.start();
};

start()
  .then(() => {
    console.log("Ready to receive requests!");
  })
  .catch(
    (err: Error): void => {
      console.error("Error starting server: ", err.message);
      process.exit(1);
    },
  );
