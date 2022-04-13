import { IUserPayload } from 'src/app/auth/@types/IUserPayload';
import { config } from 'src/environments/config';
import {
  AbstractRepository,
  Between,
  EntityRepository,
  LessThanOrEqual,
  MoreThanOrEqual,
} from 'typeorm';
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

    const finalQuery: { where: object; take?: number } = {
      where: query,
    };

    if (toDate && fromDate) {
      query.createdAt = Between(fromDate, toDate);
    } else if (fromDate) {
      query.createdAt = MoreThanOrEqual(fromDate);
      finalQuery.take = config.defaultNoOfMessageToSend;
    } else if (toDate) {
      query.createdAt = LessThanOrEqual(toDate);
      finalQuery.take = config.defaultNoOfMessageToSend;
    }

    finalQuery.where = query;

    const messages = await this.repository.find(finalQuery);
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
