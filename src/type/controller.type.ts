import { NextFunction, Response } from 'express';
import IRequest from './request.type';

export default interface IController {
  (req: IRequest, res: Response, next: NextFunction): void;
}
