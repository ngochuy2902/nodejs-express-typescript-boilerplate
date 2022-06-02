import { Request } from 'express';
import TokenPayloadType from './token-payload.type';

export default interface IRequest extends Request {
  user: TokenPayloadType;
}
