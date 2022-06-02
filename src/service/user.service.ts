import logger from '../config/logger';
import { User } from '../entity/user.entity';
import { NotFoundException } from '../error/not-found.exception';
import userRepository from '../repository/user.repository';
import { AlreadyExistException } from '../error/already-exist.exception';
import encryptionUtil from '../util/encryption.util';
import path from 'path';
import securityUtil from '../util/security.util';
import pathUtil from '../util/path.util';
import transactionUtil from '../util/transaction.util';
import { ValidatorException } from '../error/validator.exception';
import { ErrorCode } from '../constant/error-code.constant';
import { UserFetchReqDto } from '../dto/request/user/user-fetch-req.dto';
import { PaginationResDto } from '../dto/response/pagination-res.dto';
import paginationUtil from '../util/pagination.util';
import { plainToInstance } from 'class-transformer';
import { UserResDto } from '../dto/response/user/user-res.dto';

const file = pathUtil.getCurrentPath(path.basename(__filename));

const createUser = async (email: string, password: string, name: string, role: string) => {
  logger.info(`${file}: Create user with email #${email}, name #${name} and role #${role}`);
  const existUser = await userRepository.getByEmail(email);
  if (existUser) {
    throw new AlreadyExistException(email, ErrorCode.EMAIL_ALREADY_USED);
  }
  const passwordHash = await encryptionUtil.generateHash(password);

  const transaction = await transactionUtil.create();
  try {
    const user = await userRepository.save(
      {
        email,
        password: passwordHash,
        name,
        role,
      } as User,
      transaction.manager,
    );
    await transactionUtil.commit(transaction);
    return user;
  } catch (error) {
    await transactionUtil.rollBack(transaction, error);
  }
};

const fetchUsers = async (query: UserFetchReqDto): Promise<PaginationResDto> => {
  logger.info(`${file}: Fetch users with query #${query}`);
  const { keyword } = query;
  const pageRequest = paginationUtil.getPageRequest(query);

  const { users, count } = await userRepository.fetchUsers(keyword, pageRequest);

  return paginationUtil.getPageResponse(
    plainToInstance(UserResDto, users, {
      excludeExtraneousValues: true,
    }),
    query,
    count,
  );
};

const getById = async (id: number): Promise<User> => {
  logger.info(`${file}: Get user by id #${id}`);
  const user = await userRepository.getById(id);
  if (!user) {
    throw new NotFoundException(`User with id #${id}`, ErrorCode.USER_NOT_FOUND);
  }
  return user;
};

const getByEmail = async (email: string): Promise<User> => {
  logger.info(`${file}: Get user by email #${email}`);
  const user = await userRepository.getByEmail(email);
  if (!user) {
    throw new NotFoundException(`User with email #${email}`, ErrorCode.USER_NOT_FOUND);
  }
  return user;
};

const changePassword = async (currentPassword: string, newPassword: string): Promise<void> => {
  const currentUserId = securityUtil.getCurrentUserId();
  logger.info(`${file}: Change password for currentUserId #${currentUserId}`);

  const user = await userRepository.getById(currentUserId);
  if (!(await encryptionUtil.verifyHash(currentPassword, user.password))) {
    throw new ValidatorException('Invalid currentPassword', ErrorCode.WRONG_PASSWORD);
  }
  const newPasswordHash = await encryptionUtil.generateHash(newPassword);
  await userRepository.save({
    ...user,
    password: newPasswordHash,
  } as User);
};

export default {
  createUser,
  fetchUsers,
  getById,
  getByEmail,
  changePassword,
};
