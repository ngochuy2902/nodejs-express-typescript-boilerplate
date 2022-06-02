import { BaseEntity, BeforeInsert, BeforeUpdate, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import securityUtil from '../util/security.util';

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

  @BeforeInsert()
  initAuditor() {
    this.createdBy = securityUtil.getCurrentUserId();
    this.updatedBy = securityUtil.getCurrentUserId();
  }

  @BeforeUpdate()
  updateAuditor() {
    this.updatedBy = securityUtil.getCurrentUserId();
  }
}
