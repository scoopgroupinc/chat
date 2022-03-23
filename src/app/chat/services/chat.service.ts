import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

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
}
