import { AbstractRepository, EntityRepository } from 'typeorm';
import { UserDevice } from '../entities/user-devices';

@EntityRepository(UserDevice)
export class UserDeviceRepository extends AbstractRepository<UserDevice> {

}
