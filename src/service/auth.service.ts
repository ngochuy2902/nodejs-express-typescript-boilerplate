import encryptionUtil from '../util/encryption.util';
import { UnauthorizedException } from '../error/unauthorized.exception';
import { UserLoginResDto } from '../dto/response/auth/user-login-res.dto';
import logger from '../config/logger';
import path from 'path';
import userRepository from '../repository/user.repository';
import pathUtil from '../util/path.util';
import TokenPayloadType from '../type/token-payload.type';
import { ValidatorException } from '../error/validator.exception';
import { ErrorCode } from '../constant/error-code.constant';

const file = pathUtil.getCurrentPath(path.basename(__filename));

const login = async (email: string, password: string) => {
  logger.info(`${file}: Login with email #${email}`);
  const user = await userRepository.getByEmail(email);
  if (!user) {
    throw new UnauthorizedException('Wrong username or password');
  }
  const { id, role, password: passwordHash } = user;
  if (!(await encryptionUtil.verifyHash(password, passwordHash))) {
    throw new UnauthorizedException('Wrong username or password');
  }
  const { accessToken, refreshToken } = encryptionUtil.generateToken(id, role);

  return new UserLoginResDto(role, accessToken, refreshToken);
};

const refreshToken = async (refreshToken: string): Promise<UserLoginResDto> => {
  logger.info(`${file}: Refresh token`);

  const payload: TokenPayloadType = await encryptionUtil.verifyToken(refreshToken);
  if (!payload) {
    throw new ValidatorException('Invalid refreshToken', ErrorCode.INVALID_REFRESH_TOKEN);
  }
  const { id, role } = payload;
  const { accessToken: newAccessToken, refreshToken: newRefreshToken } = encryptionUtil.generateToken(id, role);

  return new UserLoginResDto(role, newAccessToken, newRefreshToken);
};

export default {
  login,
  refreshToken,
};
