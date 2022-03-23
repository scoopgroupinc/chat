import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ChatModule } from '../chat/chat.module';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [ChatModule, AuthModule],
  providers: [ChatGateway],
})
export class ChatWsModule {}
