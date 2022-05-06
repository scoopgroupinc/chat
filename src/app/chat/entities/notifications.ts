import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('notifications')
export class Notifications {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column({ type: 'bigint' })
  userId: string;

  @Column()
  isRead: boolean;

  @Column()
  title: string;

  @Column({ type: 'varchar' })
  body: string;

  @Column()
  notificationType: string;

  @Column()
  image: string;

  @Column({ type: 'json' })
  payload: JSON;
}
