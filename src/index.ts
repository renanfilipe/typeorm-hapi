import * as Boom from "@hapi/boom";
import { Request, ResponseObject, ResponseToolkit, Server } from "@hapi/hapi";
import { validate, ValidationError } from "@hapi/joi";
import * as Dotenv from "dotenv";
// tslint:disable-next-line: no-import-side-effect
import "reflect-metadata";
import { Connection, createConnection } from "typeorm";

import { BaseServer } from "./common/interface";
import { nodeEnvSchema } from "./common/validate";
import { init } from "./server";

type connectToDatabase = (server: BaseServer) => Promise<Connection>;
type preResponse = (request: Request, h: ResponseToolkit) => symbol;
type start = () => Promise<void>;
type loadEnvs = () => Dotenv.DotenvParseOutput;

/**
 * Connects to the database using environment variables.
 */
const connectToDatabase: connectToDatabase = async (server: BaseServer): Promise<Connection> =>
  createConnection({
    cli: {
      entitiesDir: "src/entities",
    },
    database: server.app.DATABASE_NAME,
    entities: ["./src/entities/*.ts"],
    host: server.app.DATABASE_URL,
    logging: false,
    password: server.app.DATABASE_PASSWORD,
    port: Number(server.app.DATABASE_PORT),
    synchronize: server.app.NODE_ENV === "development",
    type: "postgres",
    username: server.app.DATABASE_USERNAME,
  });

/**
 * Prints all unhandled errors on the screen.
 */
const preResponse: preResponse = (
  request: Request,
  h: ResponseToolkit,
): symbol => {
  const response: ResponseObject | Boom = request.response;

  if (!(response as Boom).isBoom) {
    return h.continue;
  }

  console.error(response);
  throw response;
};

/**
 * Checks if all needed environment variables exist
 */
const loadEnvs: loadEnvs = (): Dotenv.DotenvParseOutput => {
  const dotenvConfigOutput: Dotenv.DotenvConfigOutput = Dotenv.config();
  if (dotenvConfigOutput.error !== undefined || dotenvConfigOutput.parsed === undefined) {
    throw dotenvConfigOutput.error;
  }
  const { parsed: envs } = dotenvConfigOutput;
  validate(envs, nodeEnvSchema, (error: ValidationError | null) => {
    if (error !== null) {
      throw error;
    }
  });

  return envs;
};

/**
 * Starts hapi server, loads environment variables and connects to the database
 */
const start: start = async (): Promise<void> => {
  const server: Server = await init();

  server.ext("onPreResponse", preResponse);
  server.app = loadEnvs();
  await connectToDatabase(server as BaseServer);
  console.info("Connected to database!");

  await server.start();
};

start()
  .then(() => {
    console.info("Ready to receive requests!");
  })
  .catch(
    (err: Error): void => {
      console.info("Error starting server: ", err.message);
      process.exit(1);
    },
  );
