import { EntityManager, getRepository, Like } from 'typeorm';
import { User } from '../entity/user.entity';

const save = async (user: User, transactionManager?: EntityManager): Promise<User> => {
  if (transactionManager) {
    return transactionManager.save(User, getRepository(User).create(user));
  }
  return getRepository(User).save(getRepository(User).create(user));
};

const fetchUsers = async (keyword: string, pageRequest: any): Promise<{ users: User[]; count: number }> => {
  const condition = keyword && [{ name: Like(`%${keyword}%`) }, { email: Like(`%${keyword}%`) }];

  const [users, count] = await getRepository(User).findAndCount({
    where: condition,
    ...pageRequest,
  });
  return { users, count };
};

const getById = async (id: number): Promise<User> => {
  return getRepository(User).findOne({
    where: {
      id,
    },
  });
};

const getByEmail = async (email: string): Promise<User> => {
  return getRepository(User).findOne({
    where: {
      email,
    },
  });
};

export default {
  save,
  fetchUsers,
  getById,
  getByEmail,
};
