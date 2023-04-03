import { Injectable } from '@nestjs/common';
import { INotification } from '../@types/INotification';
import { Message } from 'sqs-producer';
import { SQSProducer } from 'src/app/sqs/sqs-producer.service';

@Injectable()
export class NotificationService {
  constructor(private producer: SQSProducer) {}

  async sendNotification(payload) {
    const sqsMessage: Message = {
      id: payload.id,
      body: JSON.stringify({
        id: payload.id,
        title: 'Message(s)',
        body: `You have a new  from ${payload.name} `,
        isRead: false,
        image: null,
        notificationType: 'chat',
        userId: payload.senderID,
        payload: Object({ receiverId: payload.receiverID }),
        createdAt: new Date(),
      } as INotification),
    };

    await this.producer.produce(sqsMessage);
    return 'sent';
  }
}
