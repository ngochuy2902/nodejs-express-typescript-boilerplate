import { BaseException } from './base.exception';
import { StatusCodes } from 'http-status-codes';
import { ErrorCode } from '../constant/error-code.constant';

export class ForbiddenException extends BaseException {
  constructor() {
    super('Invalid permission', StatusCodes.FORBIDDEN, ErrorCode.FORBIDDEN);
  }
}
