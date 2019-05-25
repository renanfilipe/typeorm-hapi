import { Request } from "@hapi/hapi";

export interface RegisterUserRequest extends Request {
  payload: {
    accountNumber: string;
    age: number;
    document: string;
    firstName: string;
    lastName?: string;
  };
}

export interface UpdateUserRequest extends Request {
  params: {
    id: string;
  };
  payload: {
    accountNumber: string;
    age: number;
    document: string;
    firstName: string;
    id: string;
    lastName: string;
  };
}
