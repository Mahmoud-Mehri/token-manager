export enum LogRecordType {
  Exception = "EXCEPTION",
  NotFound = "NOTFOUND",
}

export enum ErrorCode {
  None = 200,
  BadRequest = 400,
  Exception = 500,
  NotFound = 404,
  Conflict = 409,
  AuthFailed = 401,
  AccessDenied = 403,
}

export class ControllerResponse {
  success: boolean;
  data: any;
  errorCode: ErrorCode;
  message: string;

  constructor(
    _success: boolean,
    _data: object | null,
    _message: string = "",
    _errorCode: ErrorCode = ErrorCode.None
  ) {
    this.success = _success;
    this.data = _data;
    this.message = _message;
    this.errorCode = _errorCode;
  }
}

export function successResponse(
  _data: object,
  _message: string = ""
): ControllerResponse {
  return new ControllerResponse(true, _data, _message);
}
export function errorResponse(
  _errorType: ErrorCode,
  _message: string
): ControllerResponse {
  return new ControllerResponse(false, null, _message, _errorType);
}

export function mapErrorTypesToStatusCode(errorType: ErrorCode): number {
  switch (errorType) {
    case ErrorCode.BadRequest:
      return 400;
    case ErrorCode.Exception:
      return 500;
    case ErrorCode.NotFound:
      return 404;
    case ErrorCode.Conflict:
      return 409;
    case ErrorCode.AuthFailed:
      return 401;
    case ErrorCode.AccessDenied:
      return 403;
    case ErrorCode.None:
      return 200;
    default:
      return 200;
  }
}

export function omitObject(
  propName: string,
  { [propName]: _, ...others }
): object {
  return { ...others };
}

export function removeErrorCode(obj: object) {
  return omitObject("errorCode", obj);
}

export function removeId(obj: object) {
  return omitObject("id", obj);
}

export function removePassword(obj: object) {
  return omitObject("password", obj);
}

interface SessionUser {
  id: number;
  email: string;
}

declare module "express-session" {
  interface SessionData {
    user: SessionUser;
  }
}
