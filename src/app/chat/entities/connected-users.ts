import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('connected-users')
export class ConnectedUsers {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column()
  userId: string;

  @Column()
  socketId: string;

  @Column()
  ec2InstanceId: string;

  constructor(userId: string, socketId: string, ec2InstanceId: string) {
    this.userId = userId;
    this.socketId = socketId;
    this.ec2InstanceId = ec2InstanceId;
  }
}
