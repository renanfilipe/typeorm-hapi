import { Request } from "@hapi/hapi";

export interface IRegisterUserRequest extends Request {
  payload: {
    age: number;
    document: string;
    firstName: string;
    lastName: string;
  };
}

export interface IUpdateUserRequest extends Request {
  params: {
    id: string;
  };
  payload: {
    age: number;
    document: string;
    firstName: string;
    id: string;
    lastName: string;
  };
}
