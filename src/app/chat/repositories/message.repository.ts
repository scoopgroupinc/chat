import { AbstractRepository, EntityRepository } from 'typeorm';
import { Message } from '../entities/message';

@EntityRepository(Message)
export class MessageRepository extends AbstractRepository<Message> {}
