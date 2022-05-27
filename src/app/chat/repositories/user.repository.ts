import { AbstractRepository, EntityRepository } from 'typeorm';
import { User } from '../entities/user';

@EntityRepository(User)
export class UserRepository extends AbstractRepository<User> {
  async findUser(userId: string) {
    return await this.repository.findOne({ userId });
  }
}
