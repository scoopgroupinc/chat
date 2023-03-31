import { Injectable } from '@nestjs/common';
import { INotification } from '../@types/INotification';
import { SQSProducer } from 'src/app/sqs/sqs-producer.service';

@Injectable()
export class NotificationService {
  constructor(private producer: SQSProducer) {}

  async sendNotification(payload) {
    const data: INotification = {
      id: payload.id,
      title: 'Message(s)',
      body: `You have a new  from ${payload.name} `,
      isRead: false,
      image: null,
      notificationType: 'chat',
      userId: payload.senderID,
      payload: Object({ receiverId: payload.receiverID }),
      createdAt: new Date(),
    };

    await this.producer.produce(data);
    return 'sent';
  }
}
