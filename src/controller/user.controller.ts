import userService from '../service/user.service';
import apiResponseUtil from '../util/api-response.util';
import { plainToClass } from 'class-transformer';
import { UserResDto } from '../dto/response/user/user-res.dto';
import { UserCreateReqDto } from '../dto/request/user/user-create-req.dto';
import IController from '../type/controller.type';
import { ChangePasswordReqDto } from '../dto/request/user/change-password-req.dto';
import { UserFetchReqDto } from '../dto/request/user/user-fetch-req.dto';

const createUser: IController = async (req, res, next) => {
  try {
    const { email, password, name, role } = req.body as UserCreateReqDto;
    const user = await userService.createUser(email, password, name, role);
    return apiResponseUtil.created(
      res,
      plainToClass(UserResDto, user, {
        excludeExtraneousValues: true,
      }),
    );
  } catch (error) {
    next(error);
  }
};

const fetchUsers: IController = async (req, res, next) => {
  try {
    const query = new UserFetchReqDto(req.query);
    const data = await userService.fetchUsers(query);
    return apiResponseUtil.ok(res, data);
  } catch (error) {
    next(error);
  }
};

const getUserDetail: IController = async (req, res, next) => {
  try {
    const user = await userService.getById(Number(req.params.id));
    return apiResponseUtil.ok(
      res,
      plainToClass(UserResDto, user, {
        excludeExtraneousValues: true,
      }),
    );
  } catch (error) {
    next(error);
  }
};

const changePassword: IController = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body as ChangePasswordReqDto;
    await userService.changePassword(currentPassword, newPassword);
    return apiResponseUtil.noContent(res);
  } catch (error) {
    next(error);
  }
};

export default {
  createUser,
  fetchUsers,
  getUserDetail,
  changePassword,
};
