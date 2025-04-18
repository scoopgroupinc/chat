import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserPayload } from 'src/app/auth/@types/IUserPayload';

import { InjectLogger } from 'src/app/logger/decorators/inject-logger.decorator';
import { Logger } from 'src/app/logger/logger.service';
import { Repository } from 'typeorm';
import { UserStatusTypeForChat } from '../@types/UserStatusTypeForChat';
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
    userID: string,
    socketID: string,
  ): Promise<ConnectedUsers> {
    this.logger.debug(
      this.addUser.name,
      `userID: ${userID}, socketID: ${socketID}`,
    );
    // TODO: get appropriate EC2 instance ID

    const ec2InstanceID = 'abcdxyz';
    const connectedUser = await this.connectedUserRepo.findOne({
      userId: userID,
    });
    if (!connectedUser) {
      const newConnectedUser = new ConnectedUsers(
        userID,
        socketID,
        ec2InstanceID,
      );
      return await this.connectedUserRepo.save(newConnectedUser);
    }
    await this.connectedUserRepo.update(
      { userId: userID },
      { socketId: socketID },
    );
  }

  public async getUserSocketId(userId: string): Promise<ConnectedUsers> {
    return await this.connectedUserRepo.findOne({ userId });
  }

  public async updateUserStatus(
    status: UserStatusTypeForChat,
    user: IUserPayload,
  ) {
    const connectedUser = await this.connectedUserRepo.findOne({
      userId: user.userId,
    });
    let response;
    if (status.toLowerCase() === UserStatusTypeForChat.ONLINE.toLowerCase()) {
      response = await this.connectedUserRepo.save({
        ...connectedUser,
        lastActive: new Date(),
      });
    }
    if (status.toLowerCase() === UserStatusTypeForChat.OFFLINE.toLowerCase()) {
      response = await this.connectedUserRepo.save({
        ...connectedUser,
        lastActive: new Date(),
      });
    }
    return response;
  }

  public async getUserDatails(userId: string) {
    const user = await this.connectedUserRepo.findOne({ userId });
    return user?.lastActive ?? undefined;
  }
}
