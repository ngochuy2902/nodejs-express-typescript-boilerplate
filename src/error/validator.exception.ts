import { BaseException } from './base.exception';
import { StatusCodes } from 'http-status-codes';
import { ErrorCode } from '../constant/error-code.constant';

export class ValidatorException extends BaseException {
  constructor(message: string, errors: any = null, errorCode?: string) {
    super(message, StatusCodes.BAD_REQUEST, errorCode ?? ErrorCode.BAD_REQUEST, errors);
  }
}
