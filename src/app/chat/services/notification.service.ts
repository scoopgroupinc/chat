import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { INotification } from '../@types/INotification';
// import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class NotificationService {
  constructor(
    @Inject('CHAT_NOTIFICATION') private readonly client: ClientKafka,
  ) {}

  async sendNotification(payload) {
    const data: INotification = {
      id: null,
      title: 'Message(s)',
      body: `You have a new  from ${payload.name} `,
      isRead: false,
      image: null,
      notificationType: 'chat',
      userId: payload.senderID,
      payload: Object({ receiverId: payload.receiverID }),
      createdAt: new Date(),
    };

    this.client.emit('send_notification', data);
    return 'sent';
  }
}
