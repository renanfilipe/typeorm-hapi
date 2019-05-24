import { Request } from "@hapi/hapi";

export interface IdParamRequest extends Request {
  params: {
    id: string;
  };
}

export interface GetManyRequest extends Request {
  query: {
    _end: string;
    _order: string;
    _sort: string;
    _start: string;
  };
}
