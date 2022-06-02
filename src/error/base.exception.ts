export class BaseException extends Error {
  name: string;
  statusCode: number;
  errorCode: string;
  errors: string[] = [];

  constructor(message: any, statusCode: number, errorCode: string, errors: any = null) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.errors = errors;
  }
}
