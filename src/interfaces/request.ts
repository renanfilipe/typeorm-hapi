import { Request } from "@hapi/hapi";

export interface IRegisterRequest extends Request {
  payload: {
    age: number;
    document: string;
    firstName: string;
    lastName: string;
  };
}

export interface IUpdateRequest extends Request {
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

export interface IGetOneRequest extends Request {
  params: {
    id: string;
  };
}

export interface IGetManyRequest extends Request {
  query: {
    _end: string;
    _order: string;
    _sort: string;
    _start: string;
  };
}
