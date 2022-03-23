import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { InjectLogger } from 'src/app/logger/decorators/inject-logger.decorator';
import { Logger } from 'src/app/logger/logger.service';
import { Repository } from 'typeorm';
import { ConnectedUsers } from '../entities/connected-users';

@Injectable()
export class ConnectedUsersService {
  constructor(
    @InjectRepository(ConnectedUsers)
    private connectedUserRepo: Repository<ConnectedUsers>,
    @InjectLogger(ConnectedUsersService) private logger: Logger,
  ) {}
  /**
   * Delete all connected users for for given InstanceId
   */
  public async deleteAllWithInstanceId(instanceId: string) {
    this.logger.debug(
      this.deleteUserWithSocketId.name,
      `instanceId: ${instanceId}`,
    );
    await this.connectedUserRepo.delete({ ec2InstanceId: instanceId });
  }

  public async deleteUserWithSocketId(socketId: string) {
    this.logger.debug(
      this.deleteUserWithSocketId.name,
      `socketId: ${socketId}`,
    );
    await this.connectedUserRepo.delete({ socketId: socketId });
  }

  public async addUser(
    userID: number,
    socketID: string,
  ): Promise<ConnectedUsers> {
    this.logger.debug(
      this.addUser.name,
      `userID: ${userID}, socketID: ${socketID}`,
    );
    // TODO: get appropriate EC2 instance ID
    const ec2InstanceID = 'abcdxyz';
    const connectedUser = new ConnectedUsers(userID, socketID, ec2InstanceID);
    return this.connectedUserRepo.save(connectedUser);
  }
}
