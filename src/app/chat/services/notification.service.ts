import { Injectable } from '@nestjs/common';
import { INotification } from '../@types/INotification';
// import { Message } from 'sqs-producer';
import { SQSProducer } from 'src/app/sqs/sqs-producer.service';
import { ServiceBusService } from 'src/app/service-bus/service-bus.service';

@Injectable()
export class NotificationService {
  constructor(
    // private producer: SQSProducer,
    private publisher: ServiceBusService,
  ) {}

  // async sendNotification(payload) {
  //   const sqsMessage: Message = {
  //     id: payload.id,
  //     body: JSON.stringify({
  //       id: payload.id,
  //       title: 'Message(s)',
  //       body: `You have a new  from ${payload.name} `,
  //       isRead: false,
  //       image: null,
  //       notificationType: 'chat',
  //       userId: payload.senderID,
  //       payload: Object({ receiverId: payload.receiverID }),
  //       createdAt: new Date(),
  //     } as INotification),
  //   };

  //   await this.producer.produce(sqsMessage);
  //   return 'sent';
  // }

  async serviceBusNotification(payload) {
    console.log('payload data', payload);
    const message = JSON.stringify({
      id: payload.id,
      title: 'Message(s)',
      body: `You have a new  from ${payload.name} `,
      isRead: false,
      image: null,
      notificationType: 'chat',
      userId: payload.senderID,
      payload: Object({ receiverId: payload.receiverID }),
      createdAt: new Date(),
    } as INotification);

    await this.publisher.sendMessage({ body: message });
  }
}
