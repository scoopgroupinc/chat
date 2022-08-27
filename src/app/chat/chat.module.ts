import { SqsClient } from '@gemunion/nestjs-sqs';
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { LoggerModule } from '../logger/logger.module';
import { ConnectedUsers } from './entities/connected-users';
import { UserChatDetails } from './entities/user-chat-details';
import { MessageRepository } from './repositories/message.repository';
import { UserRepository } from './repositories/user.repository';
import { ChatService } from './services/chat.service';
import { ConnectedUsersService } from './services/connected-users.service';
import { NotificationService } from './services/notification.service';
import { SocketService } from './services/socket.service';
import { UserChatDetailsService } from './services/user-chat.service';
import { config } from 'src/environments/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CHAT_NOTIFICATION',
        customClass: SqsClient,
        options: {
          consumerUrl: config.producerUrl,
          producerUrl: config.consumerUrl,
        },
      },
    ]),
    TypeOrmModule.forFeature([
      ConnectedUsers,
      UserChatDetails,
      UserRepository,
      MessageRepository,
    ]),
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
