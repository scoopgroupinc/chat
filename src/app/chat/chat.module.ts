import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { LoggerModule } from '../logger/logger.module';
import { ConnectedUsers } from './entities/connected-users';
import { UserChatDetails } from './entities/user-chat-details';
import { ChatService } from './services/chat.service';
import { ConnectedUsersService } from './services/connected-users.service';
import { NotificationService } from './services/notification.service';
import { SocketService } from './services/socket.service';
import { UserChatDetailsService } from './services/user-chat.service';
import { SQSModule } from '../sqs/sqs.module';
import { ServiceBusService } from '../service-bus/service-bus.service';
import { Message } from './entities/message';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ConnectedUsers,
      UserChatDetails,
      // MessageRepository,
      Message,
    ]),
    SQSModule,
    AuthModule,
    LoggerModule.forFeature({
      consumers: [
        ConnectedUsersService,
        UserChatDetailsService,
        SocketService,
        ChatService,
        NotificationService,
      ],
    }),
  ],
  controllers: [],
  providers: [
    SocketService,
    ConnectedUsersService,
    UserChatDetailsService,
    ChatService,
    NotificationService,
    ServiceBusService,
  ],
  exports: [
    SocketService,
    ConnectedUsersService,
    UserChatDetailsService,
    ChatService,
    NotificationService,
  ],
})
export class ChatModule {}
