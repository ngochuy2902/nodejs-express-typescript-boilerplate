import { BaseException } from './base.exception';
import { StatusCodes } from 'http-status-codes';
import { ErrorCode } from '../constant/error-code.constant';

export class AlreadyExistException extends BaseException {
  constructor(object: string, errorCode?: string) {
    super(`${object} already exists`, StatusCodes.BAD_REQUEST, errorCode ?? ErrorCode.BAD_REQUEST);
  }
}
