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

    // For FindOneOptions
    const chat = await this.userChatDetailsRepo.findOne({ 
      where: { 
        toUserID: toUserID, 
        userID 
      } 
    });
    const lastRead = new Date();
    if (chat) {
      return await this.userChatDetailsRepo.save({
        ...chat,
        lastRead,
      });
    }

    const newChatDetails = await this.userChatDetailsRepo.create({
      userID,
      toUserID,
      lastRead,
    });

    return await this.userChatDetailsRepo.save(newChatDetails);
  }

  public async getUserConversationList(userID: string) {
    this.logger.debug(this.getUserConversationList.name, `userID: ${userID}`);
    // For FindManyOptions
    return await this.userChatDetailsRepo.find({ 
      where: { 
        userID, 
        lastDeleted: null 
      } 
    });
  }

  public async deleteUserChat(ofUserId: string, user: IUserPayload) {
    this.logger.debug(
      this.deleteUserChat.name,
      `user: ${user}`,
      `ofUserId: ${ofUserId}`,
    );
  
    const userChat = await this.userChatDetailsRepo.findOne({
      where: {
        toUserID: ofUserId, // Use 'ofUserId' here
        userID: user.userId,
      },
    });
  
    if (!userChat) {
      throw new Error('User chat not found');
    }
  
    await this.userChatDetailsRepo.save({
      ...userChat,
      lastDeleted: new Date(), // Use new Date() instead of Date.now() for consistency with Date objects
    });
    return 'conversation deleted';
  }
}
