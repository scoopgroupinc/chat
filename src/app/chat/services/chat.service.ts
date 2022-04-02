import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
} from '@nestjs/websockets';

import { InjectLogger } from 'src/app/logger/decorators/inject-logger.decorator';
import { Logger } from 'src/app/logger/logger.service';
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

  async getUserConversationList(userID: string) {
    return await this.userChatDetailsService.getUserConversationList(userID);
  }
}
