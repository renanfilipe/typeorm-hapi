import * as Boom from "@hapi/boom";
import { Request, ResponseObject, ResponseToolkit, Server } from "@hapi/hapi";
import * as Dotenv from "dotenv";
// tslint:disable-next-line: no-import-side-effect
import "reflect-metadata";
import { Connection, createConnection } from "typeorm";

import { init } from "./server";

Dotenv.config();

type connectToDatabase = () => Promise<Connection>;
type preResponse = (request: Request, h: ResponseToolkit) => symbol;
type start = () => Promise<void>;

const connectToDatabase: connectToDatabase = async (): Promise<Connection> =>
  createConnection({
    cli: {
      entitiesDir: "src/entities",
    },
    database: process.env.DATABASE_NAME,
    entities: ["./src/entities/*.ts"],
    host: process.env.DATABASE_URL,
    logging: false,
    password: process.env.DATABASE_PASSWORD,
    port: Number(process.env.DATABASE_PORT),
    synchronize: process.env.NODE_ENV === "development",
    type: "postgres",
    username: process.env.DATABASE_USERNAME,
  });

const preResponse: preResponse = (
  request: Request,
  h: ResponseToolkit,
): symbol => {
  const response: ResponseObject | Boom = request.response;

  if (!(response as Boom).isBoom) {
    return h.continue;
  }

  console.info(response);
  throw response;
};

const start: start = async (): Promise<void> => {
  await connectToDatabase();
  console.log("Connected to database!");
  const server: Server = await init();

  // Display erros on console
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
