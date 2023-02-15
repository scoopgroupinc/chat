import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from '../auth/auth.module';
import { ChatModule } from '../chat/chat.module';
import { ChatController } from './chat.controller';
import { HttpAuthGuard } from './guard/http-auth.guard';

@Module({
  imports: [ChatModule, AuthModule],
  controllers: [ChatController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: HttpAuthGuard,
    },
  ],
})

export class ChatHttpModule {}
