import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageBody } from '@nestjs/websockets';
import { IUserPayload } from 'src/app/auth/@types/IUserPayload';

import { InjectLogger } from 'src/app/logger/decorators/inject-logger.decorator';
import { Logger } from 'src/app/logger/logger.service';
import { UserStatusTypeForChat } from '../@types/UserStatusTypeForChat';
import { ConnectedUsersService } from './connected-users.service';
import { NotificationService } from './notification.service';
import { SocketService } from './socket.service';
import { UserChatDetailsService } from './user-chat.service';
import { Message } from '../entities/message';
import { Repository } from 'typeorm';

// TODO: We will also need Users Service so that we can get match List
@Injectable()
export class ChatService {
  constructor(
    private socketService: SocketService,
    private connectedUsersService: ConnectedUsersService,
    private userChatDetailsService: UserChatDetailsService,
    private notificationService: NotificationService,
    @InjectLogger(ChatService) private logger: Logger,
    @InjectRepository(Message) private messageRepository: Repository<Message>,
  ) {}

  async addMessage(payload): Promise<string> {
    console.log('addMessage', payload);
    //todo: check if this is a match
    this.logger.debug(this.addMessage.name, `payload: ${payload}`);
    const chatDetails = await this.userChatDetailsService.getDetailsForChat(
      payload.userID,
      payload.receiverID,
    );
    if (!chatDetails) {
      await this.userChatDetailsService.addNewDetailsForChat(
        payload.userID,
        payload.receiverID,
      );
    }
    payload.senderID = payload.userID;
    const message = await this.messageRepository.save(payload);
    const socketDetails = await this.connectedUsersService.getUserSocketId(
      payload.receiverID,
    );
    if (!socketDetails?.socketId) {
      // await this.notificationService.sendNotification({id: message.id ? `${message.id}`: undefined, ...payload});
      await this.notificationService.serviceBusNotification({
        id: message.id ? `${message.id}` : undefined,
        ...payload,
      });
      return null;
    }
    return socketDetails.socketId;
  }

  async typingMessage(@MessageBody() payload) {
    this.logger.debug(this.typingMessage.name, `payload: ${payload}`);
    const socketDetails = await this.connectedUsersService.getUserSocketId(
      payload.toUserID,
    );
    if (!socketDetails?.socketId) return null;
    return socketDetails.socketId;
  }

  async checkUserOnline(payload) {
    const user = await this.connectedUsersService.getUserSocketId(
      payload.userId,
    );
    const checkedUser = await this.connectedUsersService.getUserSocketId(
      payload.checkedUserId,
    );

    return { user, checkedUser };
  }

  // async getChatMessages(
  //   fromDate: Date,
  //   toDate: Date,
  //   page: number,
  //   ofUserId: string,
  //   user: IUserPayload,
  // ) {
  //   console.log(ofUserId, user);
  //   return await this.messageRepository.getChatMessages(
  //     fromDate,
  //     toDate,
  //     page,
  //     ofUserId,
  //     user,
  //   );
  // }

  async getUserConversationList(userID: string) {
    this.logger.debug(this.getUserConversationList.name, `userID: ${userID}`);
    return await this.userChatDetailsService.getUserConversationList(userID);
  }

  async updateUserStatus(status: UserStatusTypeForChat, user: IUserPayload) {
    this.logger.debug(
      this.updateUserStatus.name,
      `status: ${status}, user: ${user}`,
    );
    return await this.connectedUsersService.updateUserStatus(status, user);
  }

  async getUserDatails(userId: string) {
    this.logger.debug(this.getUserDatails.name, `userId: ${userId}`);
    return await this.connectedUsersService.getUserDatails(userId);
  }

  async deleteUserChat(ofUserId: string, user: IUserPayload) {
    this.logger.debug(
      this.getUserDatails.name,
      `ofUserId: ${ofUserId}, user: ${user}`,
    );
    return await this.userChatDetailsService.deleteUserChat(ofUserId, user);
  }

  // async deleteMessage(messageId: string, user: IUserPayload) {
  //   this.logger.debug(
  //     this.deleteMessage.name,
  //     `messageId: ${messageId}, user: ${user}`,
  //   );
  //   const message = await this.messageRepository.deleteMessage(messageId, user);
  //   const socketDetails = await this.connectedUsersService.getUserSocketId(
  //     message.receiverID,
  //   );
  //   if (!socketDetails?.socketId) return null;
  //   this.socketService.server
  //     .to(socketDetails.socketId)
  //     .emit('deletedMessage', message);

  //   return 'message deleted';
  // }
}
