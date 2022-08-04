import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { INotification } from '../@types/INotification';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    @Inject('CHAT_NOTIFICATION') private readonly client: ClientProxy,
  ) {}

  async sendNotification(payload) {
    const { firstName, lastName } = await this.userRepository.findUser(
      payload.senderID,
    );
    const data: INotification = {
      id: null,
      title: 'Message(s)',
      body: `You have a new  from ${firstName + ' ' + lastName} `,
      isRead: false,
      image: null,
      notificationType: 'chat',
      userId: payload.senderID,
      payload: Object({ receiverId: payload.receiverID }),
      createdAt: new Date(),
    };

    this.client.emit('send_notification', data);
  }
}
