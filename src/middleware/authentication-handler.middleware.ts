import encryptionUtil from '../util/encryption.util';
import TokenPayloadType from '../type/token-payload.type';
import { NextFunction, Response } from 'express';
import IRequest from '../type/request.type';
import { UnauthorizedException } from '../error/unauthorized.exception';
import { ForbiddenException } from '../error/forbidden.exception';
import app from '../config/express';

export const authorize = (roles: string[] = null) => {
  return async (req: IRequest, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (authorization) {
      const payload = await getPayload(authorization);
      if (!payload) {
        next(new UnauthorizedException('Invalid token'));
      } else {
        app.locals['userContext'] = { id: payload.id, role: payload.role };
        if (!roles) {
          next();
        } else if (roles.includes(payload.role)) {
          next();
        } else {
          next(new ForbiddenException());
        }
      }
    } else {
      next(new UnauthorizedException('Unauthorized'));
    }
  };
};

const getPayload = async (authorization: string): Promise<TokenPayloadType> => {
  if (!authorization.startsWith('Bearer ')) {
    return null;
  }
  const token = authorization.split(' ')[1];
  return (await encryptionUtil.verifyToken(token)) as TokenPayloadType;
};
