import { BaseException } from './base.exception';
import { StatusCodes } from 'http-status-codes';
import { ErrorCode } from '../constant/error-code.constant';

export class UnauthorizedException extends BaseException {
  constructor(message: string) {
    super(message, StatusCodes.UNAUTHORIZED, ErrorCode.UNAUTHORIZED);
  }
}
