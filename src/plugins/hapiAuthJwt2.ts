import { unauthorized } from "@hapi/boom";
import { Request, Server } from "@hapi/hapi";
import * as HapiAuthJwt2 from "hapi-auth-jwt2";
import { verify } from "jsonwebtoken";

import { User } from "../entities";

type registerJwtPlugin = (server: Server) => Promise<void>;
type validate = (decoded: Decoded, request: Request) => Promise<ValidateResponse>;

interface Decoded {
  exp: number;
  iat: number;
  id: string;
}

interface ValidateResponse {
  isValid: boolean;
}

const validate: validate = async (decoded: Decoded, request: Request): Promise<ValidateResponse> => {
  verify(request.headers.authorization, process.env.JWT_SECRET as string);

  const { id } = decoded;
  const user: User | undefined = await User.findOne({ id });
  if (user === undefined) {
    throw unauthorized("Unauthorized.");
  }

  return {
    isValid: true,
  };
};

export const registerJwtPlugin: registerJwtPlugin = async (server: Server): Promise<void> => {
  console.log("registering jwt");
  await server.register(HapiAuthJwt2);

  server.auth.strategy("jwt", "jwt", {
    key: process.env.JWT_SECRET,
    validate,
    verifyOptions: {
      algorithms: ["HS256"],
    },
  });
};
