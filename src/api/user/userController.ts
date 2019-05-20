import { ResponseObject, ResponseToolkit } from "@hapi/hapi";

import { User } from "../../entities";
import { IRegisterRequest } from "../../interfaces/request";

type register = (
  request: IRegisterRequest,
  h: ResponseToolkit,
) => Promise<ResponseObject>;

export const register: register = async (
  request: IRegisterRequest,
  h: ResponseToolkit,
): Promise<ResponseObject> => {
  const { firstName, lastName, age, document } = request.payload;
  const user: User | undefined = await User.findOne({});

  return h.response();
};
