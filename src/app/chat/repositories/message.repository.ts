import { AbstractRepository, EntityRepository } from 'typeorm';
import { Message } from '../entities/message';

@EntityRepository(Message)
export class MessageRepository extends AbstractRepository<Message> {
  async addMessageToDb(payload: Message) {
    payload.contentType = 'text';
    return await this.manager.save(payload);
  }
}
