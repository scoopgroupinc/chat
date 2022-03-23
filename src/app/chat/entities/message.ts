import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  senderID: number;

  @Column()
  receiverID: number;

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
