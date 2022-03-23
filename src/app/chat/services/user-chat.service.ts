import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
  public async getDetailsForChat(userID: number, toUserID: number) {
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
}
