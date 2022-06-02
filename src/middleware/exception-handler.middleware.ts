import { BaseException } from '../error/base.exception';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ErrorCode } from '../constant/error-code.constant';
import logger from '../config/logger';

const handleException = (error: TypeError | BaseException, req: Request, res: Response, next: NextFunction) => {
  if (!error) {
    next();
  } else {
    if (!(error instanceof BaseException)) {
      error = new BaseException(error.message, StatusCodes.INTERNAL_SERVER_ERROR, ErrorCode.INTERNAL_SERVER_ERROR);
    }
    let { message, name, statusCode, errorCode, errors } = error as BaseException;
    message = message.replace(/\r?\n|\r/g, '').replace(/\s+/g, ' ');
    logger.error(`${name}: ${message}`);
    res.status(statusCode).json({
      success: false,
      name,
      message,
      errorCode,
      ...(errors && { errors }),
    });
  }
};

export default handleException;
