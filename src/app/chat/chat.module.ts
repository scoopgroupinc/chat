import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { LoggerModule } from '../logger/logger.module';
import { ConnectedUsers } from './entities/connected-users';
import { UserChatDetails } from './entities/user-chat-details';
import { MessageRepository } from './repositories/message.repository';
import { NotificationsRepository } from './repositories/notifications.repository';
import { UserDeviceRepository } from './repositories/user-device.repository';
import { ChatService } from './services/chat.service';
import { ConnectedUsersService } from './services/connected-users.service';
import { SocketService } from './services/socket.service';
import { UserChatDetailsService } from './services/user-chat.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ConnectedUsers,
      UserChatDetails,
      MessageRepository,
      NotificationsRepository,
      UserDeviceRepository,
    ]),
    AuthModule,
    LoggerModule.forFeature({
      consumers: [
        ConnectedUsersService,
        UserChatDetailsService,
        SocketService,
        ChatService,
      ],
    }),
  ],
  controllers: [],
  providers: [
    SocketService,
    ConnectedUsersService,
    UserChatDetailsService,
    ChatService,
  ],
  exports: [
    SocketService,
    ConnectedUsersService,
    UserChatDetailsService,
    ChatService,
  ],
})
export class ChatModule {}
