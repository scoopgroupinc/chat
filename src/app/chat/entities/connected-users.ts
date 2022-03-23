import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ConnectedUsers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  socketId: string;

  @Column()
  ec2InstanceId: string;

  constructor(userId: number, socketId: string, ec2InstanceId: string) {
    this.userId = userId;
    this.socketId = socketId;
    this.ec2InstanceId = ec2InstanceId;
  }
}
