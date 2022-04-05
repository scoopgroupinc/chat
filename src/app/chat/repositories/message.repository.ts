import { IUserPayload } from 'src/app/auth/@types/IUserPayload';
import { config } from 'src/environments/dev/config';
import { AbstractRepository, Between, EntityRepository } from 'typeorm';
import { MessageContentTypes } from '../@types/MessageContentTypes';
import { Message } from '../entities/message';

@EntityRepository(Message)
export class MessageRepository extends AbstractRepository<Message> {
  async addMessageToDb(payload: Message) {
    payload.contentType = MessageContentTypes.TEXT;
    payload.sentAt = new Date();
    return await this.manager.save(payload);
  }

  async getChatMessages(
    fromDate: Date,
    toDate: Date,
    ofUserId: string,
    user: IUserPayload,
  ) {
    const query: {
      receiverID: string;
      senderID: string;
      createdAt?: object;
    } = {
      receiverID: ofUserId,
      senderID: user.userId,
    };

    if (toDate && fromDate) query.createdAt = Between(fromDate, toDate);
    else if (fromDate) query.createdAt = fromDate;
    else if (toDate) query.createdAt = toDate;

    const messages = await this.repository.find({
      where: query,
      take: config.defaultNoOfMessageToSend,
    });
    return messages;
  }

  async deleteMessage(messageId: string, user: IUserPayload) {
    const message = await this.repository.findOne({
      id: messageId,
      senderID: user.userId,
    });
    if (!message) throw new Error('message not found');
    return await this.manager.save({ ...message, deletedAt: Date.now() });
  }
}
