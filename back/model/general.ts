import { User } from "./user";

export enum LogRecordType {
  INFO = "INFO",
  ERROR = "ERROR",
}

export class ControllerResponse {
  success: boolean;
  data: any;

  constructor(_success: boolean, _data: any) {
    this.success = _success;
    this.data = _data;
  }
}

export function newResponse(_success: boolean, _data: any) {
  return new ControllerResponse(_success, _data);
}

declare module "express-session" {
  interface SessionData {
    user: User;
  }
}
