import { AbstractRepository, EntityRepository } from 'typeorm';
import { Notifications } from '../entities/notifications';

@EntityRepository(Notifications)
export class NotificationsRepository extends AbstractRepository<Notifications>{
 
}