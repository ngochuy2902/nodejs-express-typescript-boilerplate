import { BaseException } from './base.exception';
import { StatusCodes } from 'http-status-codes';
import { ErrorCode } from '../constant/error-code.constant';

export class NotFoundException extends BaseException {
  constructor(message: any, errorCode?: string) {
    super(message, StatusCodes.NOT_FOUND, errorCode ?? ErrorCode.NOT_FOUND);
  }
}
