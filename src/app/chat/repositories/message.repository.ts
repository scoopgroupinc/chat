import { IUserPayload } from 'src/app/auth/@types/IUserPayload';
import { config } from 'src/environments/dev/config';
import { AbstractRepository, Between, EntityRepository } from 'typeorm';
import { Message } from '../entities/message';

@EntityRepository(Message)
export class MessageRepository extends AbstractRepository<Message> {
  async addMessageToDb(payload: Message) {
    payload.contentType = 'text';
    payload.sentAt = new Date();
    return await this.manager.save(payload);
  }

  async getChatMessages(
    fromDate: Date,
    toDate: Date,
    ofUserId: string,
    user: IUserPayload,
  ) {
    const messages = await this.repository.find({
      where: {
        receiverID: ofUserId,
        senderID: user.userId,
        createdAt: Between(
          new Date(fromDate).toISOString(),
          new Date(toDate).toISOString(),
        ),
      },
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
