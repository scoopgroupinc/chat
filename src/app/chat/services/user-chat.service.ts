import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserPayload } from 'src/app/auth/@types/IUserPayload';
import { InjectLogger } from 'src/app/logger/decorators/inject-logger.decorator';
import { Logger } from 'src/app/logger/logger.service';
import { Repository } from 'typeorm';
import { UserChatDetails } from '../entities/user-chat-details';

@Injectable()
export class UserChatDetailsService {
  constructor(
    @InjectRepository(UserChatDetails)
    private userChatDetailsRepo: Repository<UserChatDetails>,
    @InjectLogger(UserChatDetailsService) private logger: Logger,
  ) {}
  public async getDetailsForChat(userID: string, toUserID: string) {
    this.logger.debug(
      this.getDetailsForChat.name,
      `userID: ${userID}, toUserID: ${toUserID}`,
    );
    return this.userChatDetailsRepo.findOne({
      where: {
        userID,
        toUserID,
      },
    });
  }

  public async addNewDetailsForChat(userID: string, toUserID: string) {
    this.logger.debug(
      this.addNewDetailsForChat.name,
      `userID: ${userID}, toUserID: ${toUserID}`,
    );
    return await this.userChatDetailsRepo.save({
      userID,
      toUserID,
      lastRead: new Date(),
    });
  }

  public async getUserConversationList(userID: string) {
    this.logger.debug(this.getUserConversationList.name, `userID: ${userID}`);
    return await this.userChatDetailsRepo.find({ userID, lastDeleted: null });
  }

  public async deleteUserChat(ofUserId: string, user: IUserPayload) {
    this.logger.debug(
      this.deleteUserChat.name,
      `user: ${user}`,
      `ofUserId: ${ofUserId}`,
    );

    const userChat = await this.userChatDetailsRepo.findOne({
      toUserID: ofUserId,
      userID: user.userId,
    });

    await this.userChatDetailsRepo.save({
      ...userChat,
      lastDeleted: Date.now(),
    });
    return 'conversation deleted';
  }
}
