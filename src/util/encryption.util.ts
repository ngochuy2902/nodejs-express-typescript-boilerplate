import { application } from '../config/application';

import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import TokenPayloadType from '../type/token-payload.type';

const generateHash = async (password: string, saltRounds: number = 10): Promise<string> =>
  new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err: any, hash: string) => {
      if (!err) {
        resolve(hash);
      }
      reject(err);
    });
  });

const verifyHash = async (password: string, hash: string): Promise<boolean> =>
  new Promise((resolve) => {
    bcrypt.compare(password, hash, (err: any, result: boolean) => {
      if (result) {
        resolve(true);
      }
      resolve(false);
    });
  });

const generateToken = (userId: number, role: string) => {
  const payload: TokenPayloadType = {
    id: userId,
    role,
  };
  const accessToken = jwt.sign(payload, application.auth.tokenSecretKey, {
    expiresIn: application.auth.accessTokenExpired,
  });
  const refreshToken = jwt.sign(payload, application.auth.tokenSecretKey, {
    expiresIn: application.auth.refreshTokenExpired,
  });
  return { accessToken, refreshToken };
};

const verifyToken = async (token: string): Promise<any> => {
  return new Promise((resolve) => {
    jwt.verify(token, application.auth.tokenSecretKey, (error: Error, decoded: any) => {
      if (error) {
        resolve(null);
      } else {
        resolve(decoded);
      }
    });
  });
};

export default { generateHash, verifyHash, generateToken, verifyToken };
