import { BaseRequest } from "../../common/interface";

export interface RegisterUserRequest extends BaseRequest {
  payload: {
    accountNumber: string;
    age: number;
    document: string;
    firstName: string;
    lastName?: string;
  };
}

export interface UpdateUserRequest extends BaseRequest {
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

export interface LoginRequest extends BaseRequest {
  payload: {
    document: string;
  };
}
