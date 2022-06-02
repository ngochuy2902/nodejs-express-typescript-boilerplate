import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsers1649619765470 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'email',
            type: 'varchar(255)',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar(255)',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar(255)',
            isNullable: false,
          },
          {
            name: 'role',
            type: 'varchar(10)',
            isNullable: false,
          },
          {
            name: 'activated',
            type: 'boolean',
            isNullable: false,
            default: true,
          },
          {
            name: 'createdBy',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp(3)',
            default: 'now(3)',
            isNullable: false,
          },
          {
            name: 'updatedBy',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'updatedAt',
            type: 'timestamp(3)',
            default: 'now(3)',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `users`');
  }
}
