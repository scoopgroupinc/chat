import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserChatDetails {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column()
  userID: string;

  @Column()
  toUserID: string;

  @Column()
  lastRead: Date;

  @Column({ nullable: true })
  lastDeleted: Date;
}
