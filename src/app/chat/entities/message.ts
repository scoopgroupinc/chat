import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('message')
export class Message {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column()
  senderID: string;

  @Column()
  receiverID: string;

  @Column()
  contentType: string;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  sentAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;
}
