import { BaseEntity, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class BaseModel extends BaseEntity {
  @Column({ nullable: false })
  createdBy: number;

  @Column({ nullable: false })
  updatedBy: number;

  @CreateDateColumn({
    default: () => 'now()',
  })
  createdAt: Date;

  @UpdateDateColumn({
    onUpdate: 'now()',
    default: () => 'now()',
  })
  updatedAt: Date;
}
