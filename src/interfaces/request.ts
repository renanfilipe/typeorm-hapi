import { Request } from "@hapi/hapi";

export interface IRegisterRequest extends Request {
  payload: {
    age: number;
    document: string;
    firstName: string;
    lastName: string;
  };
}
