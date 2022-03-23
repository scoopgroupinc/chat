import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserChatDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userID: number;

  @Column()
  toUserID: number;

  @Column()
  lastRead: Date;

  @Column({ nullable: true })
  lastDeleted: Date;
}
