import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('connected-users')
@Unique(['userId'])
export class ConnectedUsers {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column()
  userId: string;

  @Column()
  socketId: string;

  @Column({ nullable: true })
  ec2InstanceId: string;

  @Column({ nullable: true })
  lastActive: Date | null;

  constructor(userId: string, socketId: string, ec2InstanceId: string) {
    this.userId = userId;
    this.socketId = socketId;
    this.ec2InstanceId = ec2InstanceId;
  }
}
