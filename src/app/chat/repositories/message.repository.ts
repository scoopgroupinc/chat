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
    const messageBody = {
      receiverID: payload.receiverID,
      content: payload.content,
      createdAt: payload.createdAt,
      senderID: payload.senderID,
      contentType: MessageContentTypes.TEXT,
      sentAt: new Date(),
    };

    return await this.manager.save(Message, messageBody);
  }

  async getChatMessages(
    fromDate: Date,
    toDate: Date,
    page: number,
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

    // if (toDate && fromDate) {
    //   query.createdAt = Between(fromDate, toDate);
    // } else if (fromDate) {
    //   query.createdAt = MoreThanOrEqual(fromDate);
    // } else if (toDate) {
    //   query.createdAt = LessThanOrEqual(toDate);
    // }
    const finalQuery: { where: object; take?: number; order: any } = {
      where: [query, { senderID: ofUserId, receiverID: user.userId }],
      order: { createdAt: 'DESC' },
      take: config.defaultNoOfMessageToSend * page,
    };
    finalQuery.where = [query, { senderID: ofUserId, receiverID: user.userId }];

    const messages = await this.repository.find(finalQuery);
    return messages.reverse();
  }

  async deleteMessage(messageId: string, user: IUserPayload) {
    const message = await this.repository.findOne({
      where: {
        id: messageId,
        senderID: user.userId,
      },
    });
    if (!message) throw new Error('message not found');
    return await this.manager.save({ ...message, deletedAt: Date.now() });
  }
}
