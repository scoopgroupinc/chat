import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
} from '@nestjs/websockets';
import { IUserPayload } from 'src/app/auth/@types/IUserPayload';

import { InjectLogger } from 'src/app/logger/decorators/inject-logger.decorator';
import { Logger } from 'src/app/logger/logger.service';
import { UserStatusTypeForChat } from '../@types/UserStatusTypeForChat';
import { MessageRepository } from '../repositories/message.repository';
import { ConnectedUsersService } from './connected-users.service';
import { SocketService } from './socket.service';
import { UserChatDetailsService } from './user-chat.service';

// TODO: We will also need Users Service so that we can get match List
@Injectable()
export class ChatService {
  constructor(
    private socketService: SocketService,
    private connectedUsersService: ConnectedUsersService,
    private userChatDetailsService: UserChatDetailsService,
    @InjectRepository(MessageRepository)
    private messageRepository: MessageRepository,
    @InjectLogger(ChatService) private logger: Logger,
  ) {}

  @SubscribeMessage('addMessage')
  async addMessage(@MessageBody() payload) {
    //todo: check if this is a match

    const chatDetails = await this.userChatDetailsService.getDetailsForChat(
      payload.userID,
      payload.toUserID,
    );
    if (!chatDetails) {
      await this.userChatDetailsService.addNewDetailsForChat(
        payload.userID,
        payload.toUserID,
      );
    }
    await this.messageRepository.addMessageToDb(payload);
    const { socketId } = await this.connectedUsersService.getUserSocketId(
      payload.toUserID,
    );
    this.socketService.server
      .to(socketId)
      .emit('receiveMessage', payload.content, (response) => {
        response({
          received: true,
        });
      });
  }

  @SubscribeMessage('onTyping')
  async typingMessage(@MessageBody() payload) {
    const { socketId } = await this.connectedUsersService.getUserSocketId(
      payload.toUserID,
    );

    this.socketService.server.to(socketId).emit('isTyping', payload);
  }

  async getChatMessages(
    fromDate: Date,
    toDate: Date,
    ofUserId: string,
    user: IUserPayload,
  ) {
    return await this.messageRepository.getChatMessages(
      fromDate,
      toDate,
      ofUserId,
      user,
    );
  }

  async getUserConversationList(userID: string) {
    return await this.userChatDetailsService.getUserConversationList(userID);
  }

  async updateUserStatus(status: UserStatusTypeForChat, user: IUserPayload) {
    return await this.connectedUsersService.updateUserStatus(status, user);
  }

  async getUserDatails(userId: string) {
    return await this.connectedUsersService.getUserDatails(userId);
  }

  async deleteUserChat(ofUserId: string, user: IUserPayload) {
    return await this.userChatDetailsService.deleteUserChat(ofUserId, user);
  }

  async deleteMessage(messageId: string, user: IUserPayload) {
    const message = await this.messageRepository.deleteMessage(messageId, user);
    const { socketId } = await this.connectedUsersService.getUserSocketId(
      message.receiverID,
    );

    this.socketService.server.to(socketId).emit('deletedMessage', message);

    return 'message deleted';
  }
}
