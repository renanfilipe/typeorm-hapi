import { Request } from "@hapi/hapi";

export interface IIdParamRequest extends Request {
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