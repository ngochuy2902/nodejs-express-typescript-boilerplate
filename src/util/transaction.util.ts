import { getConnection } from 'typeorm';
import { QueryRunner } from 'typeorm/query-runner/QueryRunner';
import { ValidatorException } from '../error/validator.exception';

const create = async (): Promise<QueryRunner> => {
  const queryRunner = await getConnection().createQueryRunner();
  await queryRunner.startTransaction();
  return queryRunner;
};

const commit = async (transaction: QueryRunner): Promise<void> => {
  await transaction.commitTransaction();
  await transaction.release();
};

const rollBack = async (transaction: QueryRunner, error: any): Promise<void> => {
  await transaction.rollbackTransaction();
  await transaction.release();
  throw new ValidatorException(error);
};

export default { create, commit, rollBack };
