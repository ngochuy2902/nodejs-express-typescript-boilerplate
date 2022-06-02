import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { BaseModel } from './base.entity';
import { Role } from '../enum/role.enum';

@Entity('users')
export class User extends BaseModel {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ nullable: false })
  @Unique(['email'])
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  name: string;

  @Column({
    nullable: false,
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: string;

  @Column({
    default: 1,
  })
  activated: boolean;
}
