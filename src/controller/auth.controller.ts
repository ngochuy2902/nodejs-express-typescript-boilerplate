import { LoginReqDto } from '../dto/request/auth/login-req.dto';
import authService from '../service/auth.service';
import apiResponseUtil from '../util/api-response.util';
import IController from '../type/controller.type';
import { RefreshTokenReqDto } from '../dto/request/auth/refresh-token-req.dto';

const login: IController = async (req, res, next) => {
  try {
    const { email, password } = req.body as LoginReqDto;
    return apiResponseUtil.ok(res, await authService.login(email, password));
  } catch (error) {
    next(error);
  }
};

const refreshToken: IController = async (req, res, next) => {
  try {
    const { refreshToken } = req.body as RefreshTokenReqDto;
    return apiResponseUtil.ok(res, await authService.refreshToken(refreshToken));
  } catch (error) {
    next(error);
  }
};

export default {
  login,
  refreshToken,
};
