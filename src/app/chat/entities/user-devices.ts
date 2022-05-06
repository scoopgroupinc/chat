import {
  PrimaryColumn,
  Entity,
  Unique,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user_devices')
export class UserDevice extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @PrimaryColumn({ type: 'bigint' })
  userId: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: string;

  @Column({ nullable: true })
  osType: string;

  @Column({ nullable: true })
  macAddress?: string;

  @Column({ nullable: true })
  version?: string;

  @UpdateDateColumn()
  lastLogin?: string;

  @Column({ type: 'varchar', nullable: true })
  notificationToken: string;
}
