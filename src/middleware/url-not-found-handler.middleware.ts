import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ErrorCode } from '../constant/error-code.constant';

const urlNotFoundHandler = (req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND);
  res.json({
    message: 'URL not found',
    errorCode: ErrorCode.NOT_FOUND,
  });
};

export default urlNotFoundHandler;
